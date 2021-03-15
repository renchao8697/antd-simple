import type { FC } from 'react';
import { Modal } from 'antd';

interface CarryOutFormProps {
  modalVisible: boolean;
  title: '打卡' | '补卡';
  confirmLoading: boolean;
  onCancel: () => void;
  onOk?: () => void;
}

const CarryOutForm: FC<CarryOutFormProps> = (props) => {
  const { modalVisible, title, children, confirmLoading, onOk, onCancel } = props;
  return (
    <Modal
      destroyOnClose
      title={title}
      visible={modalVisible}
      confirmLoading={confirmLoading}
      onCancel={onCancel}
      onOk={onOk}
    >
      {children}
    </Modal>
  );
};

export default CarryOutForm;
