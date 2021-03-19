import type { FC } from 'react';
import { Modal } from 'antd';

interface AccountFormProps {
  modalVisible: boolean;
  type: 'edit' | 'create';
  onCancel: () => void;
}

const AccountForm: FC<AccountFormProps> = (props) => {
  const { type, modalVisible, children, onCancel } = props;
  return (
    <Modal
      destroyOnClose
      visible={modalVisible}
      title={type === 'edit' ? '编辑' : '创建'}
      onCancel={() => onCancel()}
      footer={null}
    >
      {children}
    </Modal>
  );
};

export default AccountForm;
