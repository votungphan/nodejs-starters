import app from './app';

import browserSync from 'browser-sync';

app.set('port', 3000);

const server = app.listen(app.get('port'), () => {
   browserSync({
      proxy: 'localhost:' + app.get('port'),
      files: ['./src/**.*'],
   });
   console.log(
      'App is running at http://localhost:%d in %s mode',
      app.get('port'),
      app.get('env'),
   );
   console.log('  Press CTRL-C to stop\n');
});

export default server;
