import type { Request, Response } from 'express';
import moment from 'moment';

function mockData(date: string) {
  const month = date.slice(0, -2);
  const today = moment().format('YYYYMMDD');
  const curDay = parseInt(today.slice(-2), 10);
  const endDay = moment(date).daysInMonth();
  const limit = month === moment().format('YYYYMM') ? curDay : endDay;
  const dataSource = {};
  for (let i = 1; i <= limit; i += 1) {
    const day = i < 10 ? `0${i}` : i;
    dataSource[month + day] = [
      {
        value: 1,
        checked: Math.random() < 0.5,
      },
      {
        value: 2,
        checked: Math.random() < 0.5,
      },
      {
        value: 3,
        checked: Math.random() < 0.5,
      },
      {
        value: 4,
        checked: Math.random() < 0.5,
      },
      {
        value: 5,
        checked: Math.random() < 0.5,
      },
    ];
  }

  return dataSource;
}

const jan = mockData('20210101');
const feb = mockData('20210201');
const mar = mockData('20210301');

const dataObj = {
  '202101': jan,
  '202102': feb,
  '202103': mar,
};

function getCarryOutCalendar(req: Request, res: Response) {
  const { date } = req.query;
  const month = (date as string).slice(0, -2);

  const dataSource = dataObj[month];

  res.json({
    code: 0,
    data: dataSource,
  });
}

function createCarryOutCalendar(req: Request, res: Response) {
  const data = req.body;
  const date = Object.keys(data)[0];
  const month = date.slice(0, -2);
  dataObj[month] = { ...dataObj[month], ...data };
  res.json({
    code: 0,
    data,
  });
}

export default {
  'GET /api/calendars': getCarryOutCalendar,
  'POST /api/calendars': createCarryOutCalendar,
};
