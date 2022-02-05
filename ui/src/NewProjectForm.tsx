import {Field, Form, Formik} from 'formik';
import {useTranslation} from 'react-i18next';
import {NewProjectMutationVariables, useNewProjectMutation} from './graphql';
import * as yup from 'yup';
import classNames from 'classnames';
import {useNavigate} from 'react-router-dom';

const initialValues: NewProjectMutationVariables = {name: ''};

const validationSchema: yup.SchemaOf<NewProjectMutationVariables> = yup.object()
  .shape({
    name: yup.string().required()
  })
  .required();

export function NewProjectForm(): JSX.Element {

  const [createNewProject, {loading, error}] = useNewProjectMutation();
  const {t} = useTranslation('common');
  const navigate = useNavigate();

  function onSubmit(variables: NewProjectMutationVariables): void {
    createNewProject({variables})
      .then(({data}) => {
        if (data) {
          navigate(`/projects/${data.newProject}`);
        }
      })
      .catch((error) => console.error(error));
  }

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      {({touched, errors}) =>
        <Form>

          <div className="field">
            <label htmlFor="name" className="label">{t('name')}:</label>
            <div className="control">
              <Field type="text" name="name" id="name" placeholder={t('name')}
                     className={classNames('input', {'is-danger': touched.name && errors.name, 'is-success': touched.name && !errors.name})}/>
            </div>
          </div>

          {error && <div className="notification is-danger">{error.message}</div>}

          <button type="submit" className={classNames('button', 'is-link', 'is-fullwidth', {'is-loading': loading})}
                  disabled={loading}>{t('createNewProject')}</button>
        </Form>}
    </Formik>
  );
}
