import {CardFragment} from '../graphql';
import {BulmaCard} from '../bulmaHelpers/card';

interface IProps {
  card: CardFragment;
}

export function Card({card}: IProps): JSX.Element {
  return (
    <BulmaCard title={card.title}>
      <>{/*JSON.stringify(card)*/}</>
    </BulmaCard>
  );
}
