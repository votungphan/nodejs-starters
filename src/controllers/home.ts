import { Request, Response } from 'express';

/*
 * Variables within <% layout() %> scope for processing Eta template
 * TODO: check how to define global variables for Eta template
 */
const etaVariables = {
   title: 'Home',
   name: 'Phan Vo',
   favorite: 'Eta',
   reasons: ['Fast', 'Lightweight', 'Simple', 'EJS compatible', 'Fun'],
};

/*
 * Home page
 * @route GET /
 */
const home = (req: Request, res: Response): unknown => {
   // return res.status(200).send('From Express App: Hello, World!');
   return res
      .status(200)
      .set('cache-control', 'no-store')
      .render('home/home', etaVariables);
};

export default home;
