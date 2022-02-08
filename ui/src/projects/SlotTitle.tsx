import {FocusEvent} from 'react';
import {useTranslation} from 'react-i18next';
import {useRenameSlotMutation} from '../graphql';

interface IProps {
  slotId: number;
  title: string;
  onDataUpdate: () => void;
}

export function SlotTitle({slotId, title, onDataUpdate}: IProps): JSX.Element {

  const {t} = useTranslation('common');
  const [renameSlot, {loading, error}] = useRenameSlotMutation();

  function onSlotTitleChangeBlur(event: FocusEvent<HTMLHeadingElement>): void {
    const newTitle = event.currentTarget.textContent;

    if (newTitle !== null && newTitle !== title) {
      renameSlot({variables: {slotId, newTitle}})
        .then(({data}) => {
          if (data?.slotMutations?.rename) {
            onDataUpdate();
          }
        })
        .catch((error) => console.error(error));
    }
  }

  return (
    <>
      <h2 className="subtitle is-4 has-text-centered" contentEditable={true} suppressContentEditableWarning={true} onBlur={onSlotTitleChangeBlur}>{title}</h2>

      {loading && <button className="button is-loading">{t('changingSlotTitle')}</button>}

      {error && <div className="notification is-danger">{error.message}</div>}
    </>
  );

}
