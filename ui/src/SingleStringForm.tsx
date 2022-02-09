import {Field, Form, Formik} from 'formik';
import classNames from 'classnames';
import * as yup from 'yup';
import {useTranslation} from 'react-i18next';
import {ApolloError} from '@apollo/client';

interface IProps {
  name?: string;
  initialValue?: string;
  loading: boolean;
  error: ApolloError | undefined;
  onSubmit: (value: string) => void;
}

interface FormValues {
  value: string;
}

const validationSchema: yup.SchemaOf<FormValues> = yup.object()
  .shape({
    value: yup.string().required()
  })
  .required();

export function SingleStringForm({name = 'title', initialValue = '', loading, error, onSubmit}: IProps): JSX.Element {

  const {t} = useTranslation('common');

  return (
    <Formik initialValues={{value: initialValue}} validationSchema={validationSchema} onSubmit={({value}) => onSubmit(value)}>
      {({touched, errors}) => <Form>

        <div className="field">
          <label htmlFor="value" className="label">{t(name)}:</label>
          <div className="control">
            <Field type="text" name="value" id="value" placeholder={t('title')} autoFocus
                   className={classNames('input', {'is-danger': touched.value && errors.value, 'is-success': touched.value && !errors.value})}/>
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
