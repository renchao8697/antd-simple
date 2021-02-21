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

    if (username === 'renchao' && password === '123456') {
      res.send({
        success: true,
      });
      return;
    }

    res.send({
      success: false,
    });
  },
};
