import {BulmaCard} from '../bulmaHelpers/card';
import {useTranslation} from 'react-i18next';
import {CreateCardMutationVariables, useCreateCardMutation} from '../graphql';
import {Field, Form, Formik} from 'formik';
import classNames from 'classnames';
import * as yup from 'yup';
import {AiOutlinePlus} from 'react-icons/ai';

interface IProps {
  slotId: number;
  onCardCreated: () => void;
}

const validationSchema: yup.SchemaOf<CreateCardMutationVariables> = yup.object()
  .shape({
    slotId: yup.number().required(),
    title: yup.string().required()
  })
  .required();

export function NewCardForm({slotId, onCardCreated}: IProps): JSX.Element {

  const [createCard, {loading, error}] = useCreateCardMutation();
  const {t} = useTranslation('common');

  const initialValues: CreateCardMutationVariables = {slotId, title: ''};

  function onSubmit(variables: CreateCardMutationVariables): void {
    createCard({variables})
      .then(({data}) => {
        if (data?.slotMutations?.createCard) {
          onCardCreated();
        }
      })
      .catch((error) => console.error(error));
  }

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      {({touched, errors}) => <Form>
        <BulmaCard title={
          <Field type="text" id="title" name="title" placeholder={t('title')}
                 className={classNames('input', {'is-danger': touched.title && errors.title, 'is-success': touched.title && !errors.title})}/>
        }>
          <>

            {error && <div className="notification is-danger">{error.message}</div>}

            <button type="submit" className={classNames('button', 'is-link', 'is-fullwidth', {'is-loading': loading})} disabled={loading}>
              <AiOutlinePlus/>
            </button>
          </>
        </BulmaCard>
      </Form>}
    </Formik>
  );
}
