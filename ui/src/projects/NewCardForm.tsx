import {CreateCardMutationVariables, useCreateCardMutation} from '../graphql';
import {SingleStringForm} from '../SingleStringForm';

interface IProps {
  slotId: number;
  onCardCreated: () => void;
}

export function NewCardForm({slotId, onCardCreated}: IProps): JSX.Element {

  const [createCard, {loading, error}] = useCreateCardMutation();

  function onSubmit(variables: CreateCardMutationVariables): void {
    createCard({variables})
      .then(({data}) => {
        if (data?.slotMutations?.createCard) {
          onCardCreated();
        }
      })
      .catch((error) => console.error(error));
  }

  return <SingleStringForm loading={loading} error={error} onSubmit={(title) => onSubmit({slotId, title})}/>;
}
