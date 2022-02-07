import {Field, Form, Formik} from 'formik';
import {useTranslation} from 'react-i18next';
import {CreateProjectMutationVariables, useCreateProjectMutation} from '../graphql';
import * as yup from 'yup';
import classNames from 'classnames';
import {useNavigate} from 'react-router-dom';

const initialValues: CreateProjectMutationVariables = {title: ''};

const validationSchema: yup.SchemaOf<CreateProjectMutationVariables> = yup.object()
  .shape({
    title: yup.string().required()
  })
  .required();

export function NewProjectForm(): JSX.Element {

  const [createProject, {loading, error}] = useCreateProjectMutation();
  const {t} = useTranslation('common');
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

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      {({touched, errors}) => <Form>

        <div className="field">
          <label htmlFor="title" className="label">{t('title')}:</label>
          <div className="control">
            <Field type="text" name="title" id="title" placeholder={t('title')} autoFocus
                   className={classNames('input', {'is-danger': touched.title && errors.title, 'is-success': touched.title && !errors.title})}/>
          </div>
        </div>

        {error && <div className="notification is-danger">{error.message}</div>}

        <button type="submit" className={classNames('button', 'is-link', 'is-fullwidth', {'is-loading': loading})} disabled={loading}>
          {t('createNewProject')}
        </button>
      </Form>}
    </Formik>
  );
}
