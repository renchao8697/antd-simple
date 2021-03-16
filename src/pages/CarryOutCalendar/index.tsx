import { useState, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Calendar, Tag } from 'antd';
import { CarryOutTwoTone } from '@ant-design/icons';
import moment, { Moment as momentType } from 'moment';
import styles from './index.less';
import CarryOutForm from './CarryOutForm';
import { getCarryOutCalendar } from './services';

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

interface CarryOutCalendarType {
  [key: string]: CarryOutItem[];
}
interface CarryOutItem {
  value: number;
  checked: boolean;
}

const CarryOutCalendar = () => {
  const today = moment(new Date()).format('YYYYMMDD');
  const yesterday = moment(new Date()).subtract(1, 'days').format('YYYYMMDD');
  const tomorrow = moment(new Date()).add(1, 'days').format('YYYYMMDD');

  const [showModal, setShowModal] = useState<boolean>(false);
  const [formTitle, setFormTitle] = useState<'打卡' | '补卡'>('打卡');
  const [confirmLoading, setLoading] = useState<boolean>(false);
  const [carryOutData, setCarryOutData] = useState<CarryOutCalendarType>({});

  const [tagData, setTagData] = useState<CarryOutItem[]>([
    {
      value: 1,
      checked: false,
    },
    {
      value: 2,
      checked: false,
    },
    {
      value: 3,
      checked: false,
    },
    {
      value: 4,
      checked: false,
    },
    {
      value: 5,
      checked: false,
    },
  ]);

  const carryOutHandler = (date: string) => {
    setShowModal(true);
    const data = carryOutData[date] ?? tagData;
    setTagData(data);
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
          {carryOutData[date] &&
            carryOutData[date].map((item: CarryOutItem) => {
              return (
                <Tag color={colorEnum[item.value]} key={item.value}>
                  {tagEnum[item.value]}
                </Tag>
              );
            })}
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

  const getData = async () => {
    const res = await getCarryOutCalendar(today);
    setCarryOutData(res.data);
  };

  useEffect(() => {
    getData();
  }, []);

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
          </div>
        </CarryOutForm>
      )}
    </PageContainer>
  );
};

export default CarryOutCalendar;
