import http from "http";
import express from 'express';
import helmet from 'helmet';
import bodyparser from 'body-parser';

import { Routes } from './controllers/routes.controller'
import { MsSqlConnect } from './helpers/mssql';


const app = express();

app.use(helmet());
app.use(bodyparser.json());
app.use('/public', express.static('public'))
// app.use(express.static(process.cwd() + '/public'));
Routes(app);
const server: http.Server = app.listen(3000);
MsSqlConnect();
server.on("listening", () => { console.info("Live_Data running") });