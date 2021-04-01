import express from 'express';

const app = express();

app.get('/', (req, res) => {
   res.send('From Express App: Hello, World!');
});

export default app;
