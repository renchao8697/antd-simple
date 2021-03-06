import { useState, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Calendar, Tag, message } from 'antd';
import { CarryOutTwoTone } from '@ant-design/icons';
import type { Moment as MomentType } from 'moment';
import moment from 'moment';
import styles from './index.less';
import CarryOutForm from './CarryOutForm';
import { getCalendar, createCalendar } from './services';
import type { ICarryOutItem, ICarryOutCalendar } from './data';
import { TagMap, ColorMap } from './maps';

const { CheckableTag } = Tag;

export const initializeTagData = (): ICarryOutItem[] => {
  const list: ICarryOutItem[] = [];
  Object.keys(TagMap).forEach((tag) => {
    list.push({ type: tag, checked: false });
  });

  return list;
};

const initTagData = initializeTagData();

const CarryOutCalendar = () => {
  const today = moment().format('YYYYMMDD');
  const yesterday = moment().subtract(1, 'days').format('YYYYMMDD');

  const startDate = moment('20210301');

  const [showModal, setShowModal] = useState<boolean>(false);
  const [formTitle, setFormTitle] = useState<'打卡' | '补卡'>('打卡');
  const [confirmLoading, setLoading] = useState<boolean>(false);

  const [carryOutData, setCarryOutData] = useState<ICarryOutCalendar>({});
  const [queryDate, setQueryDate] = useState<string>(today);

  const [tagData, setTagData] = useState<ICarryOutItem[]>(initTagData);

  const getData = async (date: string) => {
    const res = await getCalendar(date);
    setCarryOutData(res.data);
  };

  const carryOutHandler = (date: string) => {
    setShowModal(true);
    const data = carryOutData[date] ?? initTagData;
    setTagData(data);
    const title = date === today ? '打卡' : '补卡';
    setFormTitle(title);
  };

  const submitCarryOut = async () => {
    const date = formTitle === '打卡' ? today : yesterday;
    const params = {
      date,
      tagData,
    };
    try {
      await createCalendar(params);
      message.success(`${formTitle}成功`);
      setShowModal(false);
      getData(queryDate);
    } catch (error) {
      message.error(`${formTitle}失败`);
    }

    setLoading(false);
  };

  const changeCheckedTag = (checked: boolean, i: number) => {
    setTagData(tagData.map((tag, index) => (i === index ? { ...tag, checked } : tag)));
  };

  const dateCellRender = (value: MomentType) => {
    const date = value.format('YYYYMMDD');
    return (
      <div className={styles.dateCell}>
        <div>
          {carryOutData[date] &&
            carryOutData[date].map((item: ICarryOutItem) => {
              return (
                item.checked && (
                  <Tag className={styles.tag} color={ColorMap[item.type]} key={item.type}>
                    {TagMap[item.type]}
                  </Tag>
                )
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

  useEffect(() => {
    getData(queryDate);
  }, [queryDate]);

  const panelChangeHandler = (date: MomentType, mode: string) => {
    if (mode !== 'month') return;
    const curDate = moment(date).format('YYYYMMDD');

    setQueryDate(curDate);
  };

  return (
    <PageContainer>
      <Calendar
        validRange={[startDate, moment()]}
        dateCellRender={dateCellRender}
        onPanelChange={panelChangeHandler}
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
          }}
        >
          <div className={styles.checkTags}>
            {tagData.map((tag, i) => {
              return (
                <CheckableTag
                  key={tag.type}
                  checked={tag.checked}
                  onChange={(checked) => changeCheckedTag(checked, i)}
                >
                  {TagMap[tag.type]}
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
