import {NewBoardMutationVariables, useNewBoardMutation} from '../graphql';
import * as yup from 'yup';
import {Field, Form, Formik} from 'formik';
import {useTranslation} from 'react-i18next';
import classNames from 'classnames';

interface IProps {
  projectId: number;
  onBoardCreated: () => void;
}

const validationSchema: yup.SchemaOf<NewBoardMutationVariables> = yup.object()
  .shape({
    projectId: yup.number().required(),
    name: yup.string().required()
  })
  .required();

export function NewBoardForm({projectId, onBoardCreated}: IProps): JSX.Element {

  const [createNewBoard, {data, loading, error}] = useNewBoardMutation();
  const {t} = useTranslation('common');

  const initialValues: NewBoardMutationVariables = {projectId, name: ''};

  function onSubmit(variables: NewBoardMutationVariables): void {
    console.info(variables);

    createNewBoard({variables})
      .then(({data}) => {
        if (data?.projectMutations?.createBoard) {
          onBoardCreated();
        }
      })
      .catch((error) => console.error(error));
  }

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      {({touched, errors}) => <Form>

        <div className="field">
          <label htmlFor="name" className="label">{t('name')}:</label>
          <div className="control">
            <Field type="text" name="name" id="name" placeholder={t('name')}
                   className={classNames('input', {'is-danger': touched.name && errors.name, 'is-success': touched.name && !errors.name})}/>
          </div>
        </div>

        {error && <div className="notification is-danger">{error.message}</div>}

        <button type="submit" className={classNames('button', 'is-link', 'is-fullwidth', {'is-loading': loading})} disabled={loading}>
          {t('createNewBoard')}
        </button>

      </Form>}
    </Formik>
  );
}
