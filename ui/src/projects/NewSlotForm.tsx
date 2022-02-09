import {CreateSlotMutationVariables, useCreateSlotMutation} from '../graphql';
import {SingleStringForm} from '../SingleStringForm';

interface IProps {
  boardId: number;
  onSlotCreated: () => void;
}

export function NewSlotForm({boardId, onSlotCreated}: IProps): JSX.Element {

  const [createSlot, {loading, error}] = useCreateSlotMutation();

  function onSubmit(variables: CreateSlotMutationVariables): void {
    createSlot({variables})
      .then(({data}) => {
        if (data?.boardMutations?.createSlot) {
          onSlotCreated();
        }
      })
      .catch((error) => console.error(error));
  }

  return <SingleStringForm loading={loading} onSubmit={(title) => onSubmit({boardId, title})} error={error}/>;
}
