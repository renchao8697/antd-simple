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

const accountBookList = genList(100);

function getAccountBook(req: Request, res: Response) {
  const { current = 1, pageSize = 10 } = req.query;
  const dataSource = accountBookList.slice(
    ((current as number) - 1) * (pageSize as number),
    (current as number) * (pageSize as number),
  );

  const result = {
    code: 0,
    data: {
      list: dataSource,
      success: true,
      total: accountBookList.length,
      current,
      pageSize,
    },
  };

  res.json(result);
}

function updateAccountBook(req: Request, res: Response) {
  const data = req.body;
  const { _id } = data;
  const index = accountBookList.findIndex((item) => item['_id'] === _id);
  accountBookList[index] = { ...data };
  res.json({
    code: 0,
  });
}

function deleteAccountBook(req: Request, res: Response) {
  const { _id } = req.body;

  const index = accountBookList.findIndex((item) => item['_id'] === _id);

  accountBookList.splice(index, 1);

  res.json({
    code: 0,
  });
}

function createAccountBook(req: Request, res: Response) {
  const data = { ...req.body };
  data.createdAt = new Date();
  data['_id'] = parseInt(accountBookList[accountBookList.length - 1]['_id'], 10) + 1;

  accountBookList.unshift(data);
  res.json({
    code: 0,
  });
}

export default {
  'GET /api/accountbooks': getAccountBook,
  'PUT /api/accountbooks/:id': updateAccountBook,
  'DELETE /api/accountbooks/:id': deleteAccountBook,
  'POST /api/accountbooks': createAccountBook,
};
