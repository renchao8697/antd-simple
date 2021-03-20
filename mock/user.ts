import { Request, Response } from 'express';

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export default {
  'POST /api/login': async (req: Request, res: Response) => {
    const { username, password } = req.body;

    await waitTime(1000);

    if (username === 'renchao' && password === 'e10adc3949ba59abbe56e057f20f883e') {
      res.send({
        code: 0,
        data: {
          id: '123456',
          token: '123456',
          username: 'renchao',
        },
      });
      return;
    }

    res.send({
      code: 1,
    });
  },
};
