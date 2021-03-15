import { useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Calendar, Tag } from 'antd';
import { FormOutlined, EditOutlined, CheckCircleOutlined } from '@ant-design/icons';
import moment, { Moment as momentType } from 'moment';
import styles from './index.less';
import CarryOutForm from './CarryOutForm';

const { CheckableTag } = Tag;

const CarryOutCalendar = () => {
  const today = moment(new Date()).format('YYYYMMDD');
  const yesterday = moment(new Date()).subtract(1, 'days').format('YYYYMMDD');
  const tomorrow = moment(new Date()).add(1, 'days').format('YYYYMMDD');

  const [showModal, setShowModal] = useState<boolean>(false);
  const [formType, setFormType] = useState<'carryOut' | 'addition'>('carryOut');

  const additionHandler = () => {
    console.log(yesterday);
    setShowModal(true);
    setFormType('addition');
  };
  const carryOutHandler = () => {
    console.log(today);
    setShowModal(true);
    setFormType('carryOut');
  };

  const submitCarryOut = () => {
    console.log('submit');
  };

  const changeCheckedTag = (checked: boolean) => {
    console.log(checked);
  };

  const dateCellRender = (value: momentType) => {
    const date = value.format('YYYYMMDD');
    return (
      <div className={styles.dateCell}>
        {date === today && (
          <FormOutlined className={styles.carryOutButton} onClick={carryOutHandler} />
        )}
        {date === yesterday && (
          <EditOutlined className={styles.carryOutButton} onClick={additionHandler} />
        )}
        <div>
          <Tag icon={<CheckCircleOutlined />} color="magenta">
            学习
          </Tag>
          {/* <Tag color="magenta">magenta</Tag>
          <Tag color="red">red</Tag>
          <Tag color="volcano">volcano</Tag>
          <Tag color="orange">orange</Tag>
          <Tag color="gold">gold</Tag>
          <Tag color="lime">lime</Tag>
          <Tag color="green">green</Tag>
          <Tag color="cyan">cyan</Tag>
          <Tag color="blue">blue</Tag>
          <Tag color="geekblue">geekblue</Tag>
          <Tag color="purple">purple</Tag> */}
        </div>
      </div>
    );
  };

  return (
    <PageContainer>
      <Calendar
        validRange={[moment('20210101'), moment(tomorrow)]}
        dateCellRender={dateCellRender}
      />
      {showModal && (
        <CarryOutForm
          type={formType}
          modalVisible={showModal}
          onCancel={() => {
            setShowModal(false);
          }}
          onOk={() => {
            submitCarryOut();
            setShowModal(false);
          }}
        >
          <div className={styles.checkTags}>
            <CheckableTag checked={true} onChange={(checked) => changeCheckedTag(checked)}>
              学习
            </CheckableTag>
            <CheckableTag checked={false}>英语</CheckableTag>
          </div>
          <footer></footer>
        </CarryOutForm>
      )}
    </PageContainer>
  );
};

export default CarryOutCalendar;
