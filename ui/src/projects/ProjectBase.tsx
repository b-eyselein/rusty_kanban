import {Navigate, Route, Routes, useParams} from 'react-router-dom';
import {homeUrl} from '../urls';
import {Project} from './Project';

export function ProjectBase(): JSX.Element {

  const params = useParams<'id'>();

  if (!params.id) {
    return <Navigate to={homeUrl}/>;
  }

  const projectId = parseInt(params.id);

  return (
    <Routes>
      <Route path={'/'} element={<Project id={projectId}/>}/>
    </Routes>
  );
}
