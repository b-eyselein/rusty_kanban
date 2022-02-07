import {SlotFragment} from '../graphql';
import {AiOutlinePlus} from 'react-icons/ai';
import {NewSlotForm} from './NewSlotForm';
import {BulmaModalCard} from '../bulmaHelpers/modelCard';
import {useTranslation} from 'react-i18next';
import {useState} from 'react';
import {Slot} from './Slot';

interface IProps {
  boardId: number;
  slots: SlotFragment[];
  onDataUpdate: () => void;
}

export function Board({boardId, slots, onDataUpdate}: IProps): JSX.Element {

  const {t} = useTranslation('common');
  const [showNewSlotFormModal, setShowNewSlotFormModal] = useState(false);

  function onSlotCreated(): void {
    setShowNewSlotFormModal(false);

    onDataUpdate();
  }

  return (
    <>
      <div className="columns">

        {slots.map((slot) => <div className="column is-3-desktop" key={slot.id}>
          <Slot slot={slot} onDataUpdate={onDataUpdate}/>
        </div>)}

        <div className="column is-3-desktop">
          <button type="button" className="button is-link is-fullwidth" onClick={() => setShowNewSlotFormModal(true)}>
            <AiOutlinePlus/>
          </button>
        </div>
      </div>

      {showNewSlotFormModal && <BulmaModalCard title={t('createNewSlot')} show={true} close={() => setShowNewSlotFormModal(false)}>
        <NewSlotForm boardId={boardId} onSlotCreated={onSlotCreated}/>
      </BulmaModalCard>}

    </>
  );
}
