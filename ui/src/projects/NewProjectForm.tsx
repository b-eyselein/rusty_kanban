import {CreateProjectMutationVariables, useCreateProjectMutation} from '../graphql';
import {useNavigate} from 'react-router-dom';
import {SingleStringForm} from '../SingleStringForm';

export function NewProjectForm(): JSX.Element {

  const [createProject, {loading, error}] = useCreateProjectMutation();
  const navigate = useNavigate();

  function onSubmit(variables: CreateProjectMutationVariables): void {
    createProject({variables})
      .then(({data}) => {
        if (data) {
          navigate(`/projects/${data.createProject}`);
        }
      })
      .catch((error) => console.error(error));
  }

  return <SingleStringForm loading={loading} error={error} onSubmit={(title) => onSubmit({title})}/>;
}
