import http from "http";
import express from 'express';
import helmet from 'helmet';
import bodyparser from 'body-parser';

import { Routes } from './controllers/routes.controller'
// import { MsSqlConnect } from './helpers/mssql';
import { LoggerMiddleWare } from './middlewares/logger.middleware';


const app = express();

app.use(helmet());
app.use(bodyparser.json());
app.use(LoggerMiddleWare);
app.use('/public', express.static('public'))
Routes(app);
const server: http.Server = app.listen(3000);
// MsSqlConnect();
server.on("listening", () => { console.info("Live_Data running") });


// import * as net from 'net';

// const host = "172.24.0.24";
// const port = 6608;

// let onClientConnected = (sock: net.Socket) => {
//     let remoteAddress = sock.remoteAddress + ':' + sock.remotePort;
//     console.log('client connected %s', remoteAddress);
//     sock.on('data', (data) => {
//         console.log('Client dergoi: ' + data.toString())
//         // console.log('%s dergoi %s', remoteAddress, data);
//         sock.write('exit');
//     })
//     sock.on('close', () => {
//         console.log('connection from %s closed', remoteAddress);
//     })
//     sock.on('error', (err) => {
//         console.log('Conn %s error %s', remoteAddress, err.message);
//     })
// }

// const tcpServer = net.createServer(onClientConnected);

// tcpServer.listen(port, host, () => {
//     console.log('Listening on %j', tcpServer.address());
// })