import {CreateBoardMutationVariables, useCreateBoardMutation} from '../graphql';
import {SingleStringForm} from '../SingleStringForm';

interface IProps {
  projectId: number;
  onBoardCreated: () => void;
}

export function NewBoardForm({projectId, onBoardCreated}: IProps): JSX.Element {

  const [createBoard, {loading, error}] = useCreateBoardMutation();

  function onSubmit(variables: CreateBoardMutationVariables): void {
    createBoard({variables})
      .then(({data}) => {
        if (data?.projectMutations?.createBoard) {
          onBoardCreated();
        }
      })
      .catch((error) => console.error(error));
  }

  return <SingleStringForm loading={loading} error={error} onSubmit={(title) => onSubmit({projectId, title})}/>;
}
