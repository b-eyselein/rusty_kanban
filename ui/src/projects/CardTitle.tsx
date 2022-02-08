import {useTranslation} from 'react-i18next';
import {useRenameCardMutation} from '../graphql';
import {FocusEvent} from 'react';

interface IProps {
  cardId: number;
  title: string;
  onDataUpdate: () => void;
}

export function CardTitle({cardId, title, onDataUpdate}: IProps): JSX.Element {

  const {t} = useTranslation('common');
  const [renameCard, {loading, error}] = useRenameCardMutation();

  function onTitleChangeBlur(event: FocusEvent<HTMLSpanElement>): void {
    const newTitle = event.currentTarget.textContent;

    if (newTitle !== null && newTitle !== title) {
      renameCard({variables: {cardId, newTitle}})
        .then(({data}) => {
          if (data?.cardMutations?.rename) {
            onDataUpdate();
          }
        })
        .catch((error) => console.error(error));
    }
  }

  return (
    <>
      <span contentEditable={true} suppressContentEditableWarning={true} onBlur={onTitleChangeBlur}>{title}</span>

      {loading && <button className="button is-loading">{t('changingCardTitle')}</button>}

      {error && <div className="notification is-danger">{error.message}</div>}
    </>
  );

}
