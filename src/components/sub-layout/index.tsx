import React from 'react';
import SideMenu, { MenuItem } from './side-menu';
import sideMenuStyle from './index.module.less';

interface WithSideMenuLayoutProps {
  menuItems: MenuItem[];
  children: React.ReactNode;
}

const WithSideMenuLayout: React.FC<WithSideMenuLayoutProps> = ({ menuItems, children }) => {
  return (
    <div className={`flex grow ${sideMenuStyle.sideMenuLayout}`}>
      <SideMenu menuItems={menuItems} />
      <section className="p-4 flex-1">
        {children}
      </section>
    </div>
  );
};

export default WithSideMenuLayout;
