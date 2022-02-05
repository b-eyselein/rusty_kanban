import {Link, Route, Routes} from 'react-router-dom';
import {homeUrl} from './urls';
import {Home} from './Home';
import {ProjectBase} from './projects/ProjectBase';

export function App(): JSX.Element {
  return (
    <>
      <nav className="navbar is-dark">
        <div className="navbar-brand">
          <Link to="/" className="navbar-item">KanBan</Link>
        </div>
      </nav>

      <div className="container is-fluid">

        <Routes>
          <Route path={homeUrl} element={<Home/>}/>

          <Route path={'/projects/:id/*'} element={<ProjectBase/>}/>

        </Routes>

      </div>
    </>
  );
}

