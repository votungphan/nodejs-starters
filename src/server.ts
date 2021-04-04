/* eslint import/no-extraneous-dependencies: ["error", {"peerDependencies": true}] */
import browserSync from 'browser-sync';
import logger from './util/logger';
import app from './app';

app.set('port', 3000);

const server = app.listen(app.get('port'), () => {
   browserSync({
      proxy: `localhost:${app.get('port')}`,
      files: ['./src/**.*'],
   });
   logger.info(
      'App is running at http://localhost:%d in %s mode',
      app.get('port'),
      app.get('env'),
   );
   logger.info('  Press CTRL-C to stop\n');
});

export default server;
