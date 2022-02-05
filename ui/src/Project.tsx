import {useProjectByIdQuery} from './graphql';
import {WithQuery} from './WithQuery';
import {useTranslation} from 'react-i18next';

interface IProps {
  id: number;
}

export function Project({id}: IProps): JSX.Element {

  const {t} = useTranslation('common');
  const projectByIdQuery = useProjectByIdQuery({variables: {id}});

  return (
    <div className="container">
      <WithQuery query={projectByIdQuery}>
        {({projectById}) => <div>
          <h1 className="title is-3 has-text-centered">{projectById?.name}</h1>

          TODO!
        </div>}
      </WithQuery>
    </div>
  );
}
