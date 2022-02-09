import {TaskFragment} from '../graphql';

interface IProps {
  task: TaskFragment;
}

export function Task({task: {/*id, */title}}: IProps): JSX.Element {
  return <div className="mb-2">{title}</div>;
}
