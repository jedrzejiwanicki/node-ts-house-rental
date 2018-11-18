import 'reflect-metadata';
import * as bodyParser from 'body-parser';
import * as express from 'express';
import { createConnection, getRepository } from 'typeorm';
import { useExpressServer, ExpressMiddlewareInterface } from 'routing-controllers';

import { UserController } from './controllers/UserController';
import { TokenController } from "./controllers/TokenController";
import { User } from './entity/User';
import { Token } from './entity/Token';


createConnection().then(async connection => {

    // console.log("Here you can setup and run express/koa/any other framework.");
    const app = express();

    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(bodyParser.json())

    useExpressServer(app, {
        development: false,
        controllers: [UserController, TokenController] // we specify controllers we want to use
    });

    app.listen(1234);
}).catch(error => console.log(error));
