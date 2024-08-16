import React from 'react';
import { Drawer, Row, Col } from 'antd';
import ThemeSwitcher from '../theme-switcher';
import LanguageSwitcher from '../language-switcher';

interface SettingsDrawerProps {
  visible: boolean;
  onClose: () => void;
}

const SettingsDrawer: React.FC<SettingsDrawerProps> = ({
  visible,
  onClose,
}) => {
  return (
    <Drawer
      title="Settings"
      placement="right"
      onClose={onClose}
      open={visible}
      width={400}
    >
      <div className="p-4">
        <Row gutter={16}>
          <Col span={12}>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Theme Settings</h3>
              <ThemeSwitcher />
            </div>
          </Col>
          <Col span={12}>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Language Settings</h3>
              <LanguageSwitcher />
            </div>
          </Col>
        </Row>
      </div>
    </Drawer>
  );
};

export default SettingsDrawer;
