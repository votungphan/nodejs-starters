// eslint-disable-next-line import/no-extraneous-dependencies
import * as express from 'express';

const home = (req: express.Request, res: express.Response): unknown => {
   return res.send('From Express App: Hello, World!');
};

export default home;
