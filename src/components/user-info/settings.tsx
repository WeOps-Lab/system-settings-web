import React from 'react';
import { Modal, Tabs } from 'antd';
import ThemeSwitcher from '../theme-switcher';
import LanguageSwitcher from '../language-switcher';

const { TabPane } = Tabs;

interface SettingsDrawerProps {
  visible: boolean;
  onClose: () => void;
}

const SettingsModal: React.FC<SettingsDrawerProps> = ({
  visible,
  onClose,
}) => {
  return (
    <Modal
      title="Settings"
      visible={visible}
      onCancel={onClose}
      footer={null}
      width={400}
    >
      <Tabs defaultActiveKey="1">
        <TabPane tab="Theme Settings" key="1">
          <div className="space-y-4">
            <ThemeSwitcher />
          </div>
        </TabPane>
        <TabPane tab="Language Settings" key="2">
          <div className="space-y-4">
            <LanguageSwitcher />
          </div>
        </TabPane>
      </Tabs>
    </Modal>
  );
};

export default SettingsModal;
