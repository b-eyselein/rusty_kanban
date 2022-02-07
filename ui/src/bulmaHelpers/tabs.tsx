import React, {useState} from 'react';
import classNames from 'classnames';

export interface Tabs {
  [key: string]: {
    name: string;
    render: () => JSX.Element;
  };
}

interface IProps {
  tabs: Tabs;
  otherEntries?: JSX.Element;
}

export function BulmaTabs({tabs, otherEntries}: IProps): JSX.Element {

  const tabKeys = Object.keys(tabs);

  const [activeTabId, setActiveTabId] = useState<keyof Tabs>(tabKeys[0]);

  return (
    <>
      <div className="tabs is-boxed">
        <ul>
          {Object.entries(tabs).map(([id, {name}]) => <li className={classNames({'is-active': activeTabId === id})} key={id}>
            <a onClick={() => setActiveTabId(id)}>{name}</a>
          </li>)}
          {otherEntries}
        </ul>
      </div>
      {tabKeys.length > 0 && tabs[activeTabId].render()}
    </>
  );
}
