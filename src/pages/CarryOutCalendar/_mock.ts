import type { Request, Response } from 'express';

const dataSource = {
  '20210305': [
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
  ],
  '20210306': [
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
      checked: true,
    },
    {
      value: 4,
      checked: false,
    },
    {
      value: 5,
      checked: false,
    },
  ],
  '20210307': [
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
  ],
  '20210308': [
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
      checked: true,
    },
    {
      value: 4,
      checked: true,
    },
    {
      value: 5,
      checked: true,
    },
  ],
  '20210310': [
    {
      value: 1,
      checked: false,
    },
    {
      value: 2,
      checked: true,
    },
    {
      value: 3,
      checked: true,
    },
    {
      value: 4,
      checked: true,
    },
    {
      value: 5,
      checked: false,
    },
  ],
  '20210311': [
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
      checked: false,
    },
    {
      value: 5,
      checked: false,
    },
  ],
};

function getCarryOutCalendar(req: Request, res: Response) {
  console.log(`query`, req.query);

  res.json({
    code: 0,
    data: dataSource,
  });
}

export default {
  'GET /api/carryOutCalendars': getCarryOutCalendar,
};
