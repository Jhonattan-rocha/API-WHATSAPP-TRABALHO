import app from './app';
import appConfig from './config/appConfig';
import http from 'http';

export const server = http.createServer(app);

server.listen(appConfig.PORT, appConfig.IP, async () => {
    console.log(`rodando na url http://${appConfig.IP}:${appConfig.PORT}/`);

    const { initializeSocket } = require('./services/server-socket');
    initializeSocket(server);
});
