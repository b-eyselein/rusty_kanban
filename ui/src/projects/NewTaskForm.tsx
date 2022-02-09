import {CreateTaskMutationVariables, useCreateTaskMutation} from '../graphql';
import {SingleStringForm} from '../SingleStringForm';

interface IProps {
  cardId: number;
  onTaskCreated: () => void;
}

export function NewTaskForm({cardId, onTaskCreated}: IProps): JSX.Element {

  const [createTask, {loading, error}] = useCreateTaskMutation();

  function onSubmit(variables: CreateTaskMutationVariables): void {
    createTask({variables})
      .then(({data}) => {
        if (data?.cardMutations?.createTask) {
          onTaskCreated();
        }
      })
      .catch((error) => console.error(error));
  }

  return <SingleStringForm loading={loading} error={error} onSubmit={(title) => onSubmit({cardId, title})}/>;
}
