import express,{Express} from "express"
import {  sequelize } from "./src/databases/DBconn";
import {GRPCClass} from './src/provider/grpc'
import { ServiceRouter } from "./src/routes/service.route";
import { portNumber, serviceContext } from "./src/constants/constant";
// import {loggers} from "./middlewares/logger/logger.middleware"


class App{
    private app!:Express;
    private port!:number|string;
    private context!: string;

    constructor() {
        this.startApp();
    }
    startApp(){
        this.app=express();
        this.port=process.env.PORT
        this.loadGlobalMiddleWare();
        sequelize;
        new GRPCClass()
        this.loadRouter();
        this.Server();
        
    } 
    loadGlobalMiddleWare() {
        this.context = serviceContext;
        this.app.use(express.json());
        this.port = portNumber;
    
    }
    loadRouter() {
        this.app.use(this.context ,ServiceRouter.serviceRouter());
      }
    Server() {
        this.app.listen(this.port, this.callback);
    }
      private callback = () => {
            console.log(`Server listing on port: ${this.port}`);
            // loggers.info(`Server listing on port: ${this.port}`);
          };
    }
    new App();