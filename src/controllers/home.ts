import * as express from 'express';

const home = (req: express.Request, res: express.Response): unknown => {
   return res.status(200).send('From Express App: Hello, World!');
};

export default home;
