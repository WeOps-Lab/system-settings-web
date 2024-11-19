import React from 'react';
import { Tag,Space } from 'antd';

interface RoleDescriptionProps {
  modifyRoleSelect: boolean;
}

const RoleDescription: React.FC<RoleDescriptionProps> = ({ modifyRoleSelect }) => {

  return (
    <Tag>
      {modifyRoleSelect ? (
        <div className='font-normal w-[378px] h-[106px]'>
        The administrator has the following permissions:<br/>
         
         1.Manage organizations and users in system settings.<br/>
        
         2.Have the highest privileges in other apps, possessing access to all data <br/>and the ability to perform all functionality operations.
        </div>
      ) : (<div className='font-normal w-[378px] h-[106px]'>
        normal  users have the following permissions: <br/>
         
        1. Cannot manage organizations and users. <br/>
        
        2. In other apps, have data access rights only for their own organization. <br/>

        3. In other apps, have only operational permissions for using pages, with <br/>management pages having view-only access.
      </div>
      )}
    </Tag>
  );
};

export default RoleDescription;