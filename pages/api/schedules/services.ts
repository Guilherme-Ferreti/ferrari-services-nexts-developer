import { withIronSessionApiRoute } from 'iron-session/next';
import { NextApiRequest, NextApiResponse } from 'next';
import { ScheduleSession } from '../../../types/ScheduleSession';
import { sessionOptions } from '../../../utils/session';

export default withIronSessionApiRoute(async function (
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const services = req.body.services
      .map((id: any) => +id)
      .filter((id: number) => !isNaN(id));

    const schedule = {
      ...(req.session.schedule ?? {}),
      services,
    } as ScheduleSession;

    if (services.length === 0) {
      res.status(400).json({
        message: 'Escolha um serviço',
      });
      return;
    }

    req.session.schedule = schedule;

    await req.session.save();
  } catch (e: any) {
    res.status(400).json({
      message: e.message,
    });
  }
},
sessionOptions);
