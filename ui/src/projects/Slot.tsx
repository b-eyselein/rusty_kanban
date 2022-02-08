import {SlotFragment} from '../graphql';
import {AiOutlinePlus} from 'react-icons/ai';
import {NewCardForm} from './NewCardForm';
import {useState} from 'react';
import {Card} from './Card';
import {SlotTitle} from './SlotTitle';

interface IProps {
  slot: SlotFragment;
  onDataUpdate: () => void;
}

export function Slot({slot, onDataUpdate}: IProps): JSX.Element {

  const [showNewCardForm, setShowNewCardForm] = useState(false);

  const {id, title, cards} = slot;

  function onCardCreated(): void {
    setShowNewCardForm(false);
    onDataUpdate();
  }

  return (
    <>
      <SlotTitle slotId={id} title={title} onDataUpdate={onDataUpdate}/>

      {cards.map((card) => <div className="my-3" key={card.id}>
        <Card card={card}/>
      </div>)}

      {showNewCardForm && <div className="my-3">
        <NewCardForm slotId={id} onCardCreated={onCardCreated}/>
      </div>}

      <button type="button" className="my-3 button is-link" onClick={() => setShowNewCardForm(true)}>
        <AiOutlinePlus/>
      </button>
    </>
  );
}
