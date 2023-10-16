import express from "express"
import {Router} from "express"
import { Server } from "@grpc/grpc-js";

import {serviceController} from "../controllers/admin/newService"

class serviceRouter{ 
    private router!:Router;
    constructor(){
        this.router=Router();
    }
    public loadService(grpcServer:Server,AddServicePackage:any){
        grpcServer.addService(AddServicePackage.newservice.service,{
            CreateService:serviceController.new_sevice
        })
    }
    serviceRouter(){
        // this.router.post("/addservice",serviceController.new_sevice);
        return this.router;
    }
}

export const ServiceRouter= new serviceRouter();