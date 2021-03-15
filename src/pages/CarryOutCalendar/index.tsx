import { useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Calendar, Tag } from 'antd';
import { CarryOutTwoTone } from '@ant-design/icons';
import moment, { Moment as momentType } from 'moment';
import styles from './index.less';
import CarryOutForm from './CarryOutForm';

const { CheckableTag } = Tag;

enum tagEnum {
  '学习' = 1,
  '英语' = 2,
  '听力' = 3,
  '算法' = 4,
  '面试题' = 5,
}
enum colorEnum {
  'magenta' = 1,
  'red' = 2,
  'volcano' = 3,
  'orange' = 4,
  'gold' = 5,
  'lime' = 6,
  'green' = 7,
  'cyan' = 8,
  'blue' = 9,
  'geekblue' = 10,
  'purple' = 11,
}
const dataSource = {
  '20210305': [1, 2, 3],
  '20210306': [1, 2, 3, 4],
  '20210307': [1, 2, 5],
  '20210308': [1, 3, 4],
  '20210310': [2, 3, 5],
  '20210311': [1, 2, 3, 4, 5],
};

const CarryOutCalendar = () => {
  const today = moment(new Date()).format('YYYYMMDD');
  const yesterday = moment(new Date()).subtract(1, 'days').format('YYYYMMDD');
  const tomorrow = moment(new Date()).add(1, 'days').format('YYYYMMDD');

  const [showModal, setShowModal] = useState<boolean>(false);
  const [formTitle, setFormTitle] = useState<'打卡' | '补卡'>('打卡');
  const [confirmLoading, setLoading] = useState<boolean>(false);

  const [tagData, setTagData] = useState([
    {
      value: 1,
      checked: true,
    },
    {
      value: 2,
      checked: true,
    },
    {
      value: 3,
      checked: false,
    },
    {
      value: 4,
      checked: true,
    },
    {
      value: 5,
      checked: false,
    },
  ]);

  const carryOutHandler = (date: string) => {
    setShowModal(true);
    const title = date === today ? '打卡' : '补卡';
    setFormTitle(title);
  };

  const submitCarryOut = () => {
    console.log('submit', tagData);
  };

  const changeCheckedTag = (checked: boolean, i: number) => {
    setTagData(tagData.map((tag, index) => (i === index ? { ...tag, checked } : tag)));
  };

  const dateCellRender = (value: momentType) => {
    const date = value.format('YYYYMMDD');
    return (
      <div className={styles.dateCell}>
        <div>
          {dataSource[date] &&
            dataSource[date].map((val: number) => {
              return (
                <Tag color={colorEnum[val]} key={val}>
                  {tagEnum[val]}
                </Tag>
              );
            })}
          {/* <Tag color="magenta">
            学习
          </Tag> */}
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
        {(date === today || date === yesterday) && (
          <CarryOutTwoTone
            className={styles.carryOutButton}
            onClick={() => carryOutHandler(date)}
          />
        )}
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
          title={formTitle}
          modalVisible={showModal}
          confirmLoading={confirmLoading}
          onCancel={() => {
            setShowModal(false);
          }}
          onOk={() => {
            setLoading(true);
            submitCarryOut();
            setTimeout(() => {
              setLoading(false);
              setShowModal(false);
            }, 2000);
          }}
        >
          <div className={styles.checkTags}>
            {tagData.map((tag, i) => {
              return (
                <CheckableTag
                  key={tag.value}
                  checked={tag.checked}
                  onChange={(checked) => changeCheckedTag(checked, i)}
                >
                  {tagEnum[tag.value]}
                </CheckableTag>
              );
            })}
            {/* <CheckableTag checked={true} onChange={(checked) => changeCheckedTag(checked)}>
              学习
            </CheckableTag>
            <CheckableTag checked={false}>英语</CheckableTag> */}
          </div>
          <footer></footer>
        </CarryOutForm>
      )}
    </PageContainer>
  );
};

export default CarryOutCalendar;
