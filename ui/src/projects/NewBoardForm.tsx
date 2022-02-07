import {CreateBoardMutationVariables, useCreateBoardMutation} from '../graphql';
import * as yup from 'yup';
import {Field, Form, Formik} from 'formik';
import {useTranslation} from 'react-i18next';
import classNames from 'classnames';

interface IProps {
  projectId: number;
  onBoardCreated: () => void;
}

const validationSchema: yup.SchemaOf<CreateBoardMutationVariables> = yup.object()
  .shape({
    projectId: yup.number().required(),
    title: yup.string().required()
  })
  .required();

export function NewBoardForm({projectId, onBoardCreated}: IProps): JSX.Element {

  const [createBoard, {loading, error}] = useCreateBoardMutation();
  const {t} = useTranslation('common');

  const initialValues: CreateBoardMutationVariables = {projectId, title: ''};

  function onSubmit(variables: CreateBoardMutationVariables): void {
    createBoard({variables})
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
          <label htmlFor="title" className="label">{t('title')}:</label>
          <div className="control">
            <Field type="text" name="title" id="title" placeholder={t('title')} autoFocus
                   className={classNames('input', {'is-danger': touched.title && errors.title, 'is-success': touched.title && !errors.title})}/>
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
