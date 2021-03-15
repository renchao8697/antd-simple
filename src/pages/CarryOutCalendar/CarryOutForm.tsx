import type { FC } from 'react';
import { Modal } from 'antd';

interface CarryOutFormProps {
  modalVisible: boolean;
  type: 'addition' | 'carryOut';
  onCancel: () => void;
  onOk?: () => void;
}

const CarryOutForm: FC<CarryOutFormProps> = (props) => {
  const { modalVisible, type, children, onOk, onCancel } = props;
  const title = type === 'carryOut' ? '打卡' : '补卡';
  return (
    <Modal destroyOnClose title={title} visible={modalVisible} onCancel={onCancel} onOk={onOk}>
      {children}
    </Modal>
  );
};

export default CarryOutForm;
