import {FocusEvent} from 'react';
import {useRenameProjectMutation} from '../graphql';
import {useTranslation} from 'react-i18next';

interface IProps {
  projectId: number;
  title: string;
  onDataUpdate: () => void;
}

export function ProjectTitle({projectId, title, onDataUpdate}: IProps): JSX.Element {

  const {t} = useTranslation('common');
  const [renameProject, {loading, error}] = useRenameProjectMutation();

  function onTitleChangeBlur(event: FocusEvent<HTMLHeadingElement>): void {
    const newTitle = event.currentTarget.textContent;

    if (newTitle !== null && newTitle !== title) {
      renameProject({variables: {id: projectId, newTitle}})
        .then(({data}) => {
          if (data?.projectMutations?.rename) {
            onDataUpdate();
          }
        })
        .catch((error) => console.error(error));
    }
  }

  return (
    <>
      <h1 className="title is-3" contentEditable="true" suppressContentEditableWarning={true} onBlur={onTitleChangeBlur}>
        {title}

        {loading && <button className="button is-loading" title={t('changingProjectTitle')}/>}
      </h1>

      {error && <div className="notification is-danger">{error.message}</div>}

    </>
  );
}
