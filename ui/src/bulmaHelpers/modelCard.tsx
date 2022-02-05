import classNames from 'classnames';

interface IProps {
  title: string;
  show: boolean;
  children: JSX.Element | string;
  close: () => void;
}

export function BulmaModalCard({title, show, children, close}: IProps): JSX.Element {
  return (
    <div className={classNames('modal', {'is-active': show})}>
      <div className="modal-background"/>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">{title}</p>
          <button className="delete" onClick={close}/>
        </header>
        <section className="modal-card-body">{children}</section>
        {/*<footer className="modal-card-footer"></footer>*/}
      </div>
    </div>
  );
}
