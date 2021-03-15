import {Request, Response} from 'express'

export default {
  'GET /api/': async (req: Request, res: Response) => {
    res.send({
      code: 0,
      data: 'Mock'
    })
  }
}