import React from 'react';
import { Dropdown, Space, Menu, message, Avatar } from 'antd';
import { signOut, useSession } from 'next-auth/react';
import { DownOutlined } from '@ant-design/icons';

const UserInfo: React.FC = () => {
  const { data: session } = useSession();
  const username = session?.user?.name || 'Qiu-Jia';

  const handleLogout = () => {
    signOut({ callbackUrl: '/' });
  };

  const handleSettings = () => {
    message.info('Settings clicked');
  };

  const items: Array<{ label: JSX.Element; key: string } | { type: 'divider' }> = [
    {
      label: <a onClick={handleSettings}>Settings</a>,
      key: '0',
    },
    {
      type: 'divider',
    },
    {
      label: <a onClick={handleLogout}>Logout</a>,
      key: '1',
    },
  ];

  return (
    <div>
      {username && (
        <Dropdown overlay={<Menu items={items} />} trigger={['click']}>
          <a onClick={(e) => e.preventDefault()}>
            <Space className='text-sm'>
              <Avatar 
                size="small"
                style={{ 
                  backgroundColor: 'var(--color-primary)',
                  verticalAlign: 'middle' 
                }}>
                {username.charAt(0).toUpperCase()}
              </Avatar>
              {username}
              <DownOutlined style={{ fontSize: '10px' }} />
            </Space>
          </a>
        </Dropdown>
      )}
    </div>
  );
};

export default UserInfo;
