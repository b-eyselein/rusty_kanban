import {useProjectByIdQuery} from '../graphql';
import {WithQuery} from '../WithQuery';
import {WithNullableNavigate} from '../WithNullableNavigate';
import {BulmaTabs, Tabs} from '../bulmaHelpers/tabs';
import {useState} from 'react';
import {BulmaModalCard} from '../bulmaHelpers/modelCard';
import {NewBoardForm} from './NewBoardForm';
import {useTranslation} from 'react-i18next';
import {AiOutlinePlus} from 'react-icons/ai';

interface IProps {
  id: number;
}

function generateTabsFromBoards(boards: { id: number, name: string }[]): Tabs {
  return boards.reduce<Tabs>((acc, {id, name}) => {
    acc[name] = {
      name,
      render: () => <div>TODO!</div>
    };
    return acc;
  }, {});
}

export function Project({id}: IProps): JSX.Element {

  const {t} = useTranslation('common');
  const projectByIdQuery = useProjectByIdQuery({variables: {id}});
  const [showNewBoardFormModal, setShowNewBoardFormModal] = useState(false);

  function onBoardCreated(): void {
    setShowNewBoardFormModal(false);
    projectByIdQuery.refetch().catch((error) => console.error(error));
  }

  return (
    <>
      <WithQuery query={projectByIdQuery}>
        {({projectById}) => <WithNullableNavigate t={projectById}>
          {({name, boards}) => <div>
            <h1 className="title is-3">{name}</h1>

            <BulmaTabs tabs={generateTabsFromBoards(boards)} otherEntries={<li><a onClick={() => setShowNewBoardFormModal(true)}><AiOutlinePlus/></a></li>}/>

          </div>}
        </WithNullableNavigate>}
      </WithQuery>

      {showNewBoardFormModal && <BulmaModalCard title={t('createNewBoard')} show={true} close={() => setShowNewBoardFormModal(false)}>
        <NewBoardForm projectId={id} onBoardCreated={onBoardCreated}/>
      </BulmaModalCard>}
    </>
  );
}
