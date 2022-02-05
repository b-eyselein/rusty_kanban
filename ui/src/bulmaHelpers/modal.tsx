import classNames from 'classnames';

interface IProps {
  show: boolean;
  children: JSX.Element;
  close: () => void;
}

export function BulmaModal({show, children, close}: IProps): JSX.Element {
  return (
    <div className={classNames('modal', {'is-active': show})}>
      <div className="modal-background"/>
      <div className="modal-content">{children}</div>
      <button className="modal-close is-large" onClick={close}/>
    </div>
  );
}
