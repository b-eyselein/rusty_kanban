import {useAllProjectsQuery} from './graphql';
import {WithQuery} from './WithQuery';
import {useTranslation} from 'react-i18next';
import {Link} from 'react-router-dom';
import {AiOutlinePlus} from 'react-icons/ai';
import {useState} from 'react';
import {NewProjectForm} from './NewProjectForm';
import {BulmaModalCard} from './bulmaHelpers/modelCard';

export function Home(): JSX.Element {

  const {t} = useTranslation('common');
  const allProjectsQuery = useAllProjectsQuery();
  const [showNewProjectFormModal, setShowNewProjectFormModal] = useState(false);

  return (
    <div className="container">
      <h1 className="title is-3 has-text-centered">{t('myProjects')}</h1>

      <WithQuery query={allProjectsQuery}>
        {({projects}) => <div className="columns">
          {projects.map(({id, name}) =>
            <div className="column is-one-fifth-desktop" key={id}>
              <Link className="button is-link is-fullwidth" to={`/projects/${id}`}>{name}</Link>
            </div>
          )}

          <div className="column is-one-fifth-desktop">
            <button className="button is-fullwidth" onClick={() => setShowNewProjectFormModal(true)}>
              <AiOutlinePlus/>
            </button>
          </div>
        </div>}
      </WithQuery>

      <BulmaModalCard title={t('createNewProject')} show={showNewProjectFormModal} close={() => setShowNewProjectFormModal(false)}>
        <NewProjectForm/>
      </BulmaModalCard>

    </div>
  );
}
