import {CardFragment} from '../graphql';
import {BulmaCard} from '../bulmaHelpers/card';
import {CardTitle} from './CardTitle';
import {AiOutlinePlus} from 'react-icons/ai';
import {useState} from 'react';
import {NewTaskForm} from './NewTaskForm';
import {Task} from './Task';

interface IProps {
  card: CardFragment;
  onDataUpdate: () => void;
}

export function Card({card, onDataUpdate}: IProps): JSX.Element {

  const {id, title, tasks} = card;

  const [addTask, setAddTask] = useState(false);

  function onTaskCreated(): void {
    setAddTask(false);
    onDataUpdate();
  }

  return (
    <BulmaCard title={<CardTitle title={title} cardId={id} onDataUpdate={onDataUpdate}/>}>
      <>
        {tasks.map((task) => <Task key={id} task={task}/>)}

        {addTask && <NewTaskForm cardId={id} onTaskCreated={onTaskCreated}/>}

        <button className="button is-link" onClick={() => setAddTask(true)}><AiOutlinePlus/></button>
      </>
    </BulmaCard>
  );
}
