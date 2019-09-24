import http from "http";
import express from 'express';
import helmet from 'helmet';
import bodyparser from 'body-parser';

import { Routes } from './controllers/routes.controller'

const app = express();

app.use(helmet());
app.use(bodyparser.json());
app.use('/public/favicon.ico', express.static('images/favicon.ico'));
Routes(app);

const server: http.Server = app.listen(3000);

server.on("listening", () => {console.info("Live_Data running")});