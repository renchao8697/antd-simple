import type { Request, Response } from 'express';

function genList(count: number) {
  const data = [];
  for (let i = 0; i < count; i += 1) {
    data.push({
      _id: `10000${i}`,
      createdAt: new Date(),
      amount: Math.floor(Math.random() * 1000),
      date: new Date(),
      desc: 'lalalalalala',
      status: `${Math.floor((Math.random() * 10) % 5) + 1}`,
    });
  }
  return data;
}

const accountList = genList(100);

function getAccount(req: Request, res: Response) {
  const { current = 1, pageSize = 10 } = req.query;
  const dataSource = accountList.slice(
    ((current as number) - 1) * (pageSize as number),
    (current as number) * (pageSize as number),
  );

  const result = {
    code: 0,
    data: {
      list: dataSource,
      success: true,
      total: accountList.length,
      current,
      pageSize,
    },
  };

  res.json(result);
}

function updateAccount(req: Request, res: Response) {
  const data = req.body;
  const { _id } = data;
  const index = accountList.findIndex((item) => item._id === _id);
  accountList[index] = { ...data };
  res.json({
    code: 0,
  });
}

function deleteAccount(req: Request, res: Response) {
  const { _id } = req.body;

  const index = accountList.findIndex((item) => item._id === _id);

  accountList.splice(index, 1);

  res.json({
    code: 0,
  });
}

function createAccount(req: Request, res: Response) {
  const data = { ...req.body };
  data.createdAt = new Date();
  data._id = parseInt(accountList[accountList.length - 1]._id, 10) + 1;

  accountList.unshift(data);
  res.json({
    code: 0,
  });
}

export default {
  'GET /api/accounts': getAccount,
  'PUT /api/accounts/:id': updateAccount,
  'DELETE /api/accounts/:id': deleteAccount,
  'POST /api/accounts': createAccount,
};
