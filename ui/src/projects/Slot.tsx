import {SlotFragment} from '../graphql';
import {AiOutlinePlus} from 'react-icons/ai';
import {NewCardForm} from './NewCardForm';
import {useState} from 'react';
import {Card} from './Card';

interface IProps {
  slot: SlotFragment;
  onDataUpdate: () => void;
}

export function Slot({slot, onDataUpdate}: IProps): JSX.Element {

  const [showNewCardForm, setShowNewCardForm] = useState(false);

  function onCardCreated(): void {
    setShowNewCardForm(false);
    onDataUpdate();
  }

  return (
    <>
      <h2 className="subtitle is-4 has-text-centered">{slot.title}</h2>

      {slot.cards.map((card) => <div className="my-3" key={card.id}>
        <Card card={card}/>
      </div>)}

      {showNewCardForm && <div className="my-3">
        <NewCardForm slotId={slot.id} onCardCreated={onCardCreated}/>
      </div>}

      <button type="button" className="my-3 button is-link" onClick={() => setShowNewCardForm(true)}>
        <AiOutlinePlus/>
      </button>
    </>
  );
}
