import {CardFragment} from '../graphql';
import {BulmaCard} from '../bulmaHelpers/card';
import {CardTitle} from './CardTitle';

interface IProps {
  card: CardFragment;
  onDataUpdate: () => void;
}

export function Card({card, onDataUpdate}: IProps): JSX.Element {

  const {id, title, tasks} = card;

  return (
    <BulmaCard title={<CardTitle title={title} cardId={id} onDataUpdate={onDataUpdate}/>}>
      <>{/*JSON.stringify(card)*/}</>
    </BulmaCard>
  );
}
