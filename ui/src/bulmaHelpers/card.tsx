interface IProps {
  title: string;
  children: JSX.Element | string;
}

export function BulmaCard({title, children}: IProps): JSX.Element {
  return (
    <div className="card">
      <header className="card-header">
        <p className="card-header-title">{title}</p>
      </header>
      <div className="card-content">{children}</div>
      {/*<footer className="card-footer"></footer>*/}
    </div>
  );
}
