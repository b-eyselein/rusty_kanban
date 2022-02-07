import {CardFragment} from '../graphql';

interface IProps {
  card: CardFragment;
}

export function Card({card}: IProps): JSX.Element {
  return <div>{JSON.stringify(card)}</div>;
}
