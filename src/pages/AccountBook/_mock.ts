import type { Request, Response } from 'express';

function genList(count: number) {
  const data = [];
  for (let i = 0; i < count; i += 1) {
    data.push({
      id: `10000${i}`,
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
    data: dataSource,
    success: true,
    total: accountBookList.length,
    current,
    pageSize,
  };

  res.json(result);
}

function updateAccountBook(req: Request, res: Response) {
  const data = req.body;
  const { id } = data;
  const index = accountBookList.findIndex((item) => item.id === id);
  accountBookList[index] = { ...data };
  res.json({
    success: true,
  });
}

function deleteAccountBook(req: Request, res: Response) {
  const { id } = req.body;

  const index = accountBookList.findIndex((item) => item.id === id);

  accountBookList.splice(index, 1);

  res.json({
    success: true,
  });
}

function createAccountBook(req: Request, res: Response) {
  const data = { ...req.body };
  data.createdAt = new Date();
  data.id = parseInt(accountBookList[accountBookList.length - 1].id, 10) + 1;

  accountBookList.unshift(data);
  res.json({
    success: true,
  });
}

export default {
  'GET /api/accountbook': getAccountBook,
  'PUT /api/accountbook': updateAccountBook,
  'DELETE /api/accountbook': deleteAccountBook,
  'POST /api/accountbook': createAccountBook,
};
