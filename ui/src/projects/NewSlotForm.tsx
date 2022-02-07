import {CreateSlotMutationVariables, useCreateSlotMutation} from '../graphql';
import * as yup from 'yup';
import {Field, Form, Formik} from 'formik';
import {useTranslation} from 'react-i18next';
import classNames from 'classnames';

interface IProps {
  boardId: number;
  onSlotCreated: () => void;
}

const validationSchema: yup.SchemaOf<CreateSlotMutationVariables> = yup.object()
  .shape({
    boardId: yup.number().required(),
    title: yup.string().required()
  })
  .required();

export function NewSlotForm({boardId, onSlotCreated}: IProps): JSX.Element {

  const [createSlot, {loading, error}] = useCreateSlotMutation();
  const {t} = useTranslation('common');

  const initialValues: CreateSlotMutationVariables = {boardId, title: ''};

  function onSubmit(variables: CreateSlotMutationVariables): void {
    createSlot({variables})
      .then(({data}) => {
        if (data?.boardMutations?.createSlot) {
          onSlotCreated();
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
            <Field type="text" name="title" placeholder={t('title')} autoFocus
                   className={classNames('input', {'is-danger': touched.title && errors.title, 'is-success': touched.title && !errors.title})}/>
          </div>
        </div>

        {error && <div className="notification is-danger">{error.message}</div>}

        <button type="submit" className={classNames('button', 'is-link', 'is-fullwidth', {'is-loading': loading})} disabled={loading}>
          {t('createNewSlot')}
        </button>

      </Form>}
    </Formik>
  );
}
