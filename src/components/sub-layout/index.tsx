import React from 'react';
import SideMenu, { MenuItem } from './side-menu';
import sideMenuStyle from './index.module.less';
import { calc } from 'antd/es/theme/internal';

interface WithSideMenuLayoutProps {
  menuItems: MenuItem[];
  intro?: React.ReactNode;
  showBackButton?: boolean;
  onBackButtonClick?: () => void;
  children: React.ReactNode;
  topSection?: React.ReactNode;
}

const WithSideMenuLayout: React.FC<WithSideMenuLayoutProps> = ({ 
  menuItems, 
  intro, 
  showBackButton, 
  onBackButtonClick, 
  children,
  topSection
}) => {
  return (
    <div className={`flex grow ${sideMenuStyle.sideMenuLayout}`}>
      <SideMenu 
        menuItems={menuItems}
        showBackButton={showBackButton}
        onBackButtonClick={onBackButtonClick}
      >
        {intro}
      </SideMenu>
      <section className="flex flex-col" style={{ width: 'calc(100% - 260px)' }}>
        {topSection && (
          <div className={`mb-4 rounded-md ${sideMenuStyle.sectionContainer}`} style={{ flex: '0 0 1' }}>
            {topSection}
          </div>
        )}
        <div className={`p-4 flex-1 rounded-md overflow-auto ${sideMenuStyle.sectionContainer}`}>
          {children}
        </div>
      </section>
    </div>
  );
};

export default WithSideMenuLayout;