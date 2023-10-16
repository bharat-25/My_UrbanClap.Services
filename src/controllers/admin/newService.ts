import { error } from 'console';
import { ServerUnaryCall, sendUnaryData } from "@grpc/grpc-js";
import { Request, Response } from "express";
import {service_Add} from "../../services/Admin/addNewService"
import { RESPONSE_CODES,SERVICE_MSG, SERVICE_MSG_CODE } from "../../responses/response";

class ServiceController{
    constructor() {}

    async new_sevice(req: ServerUnaryCall<any, any>, res: sendUnaryData<any>) {
        try {
            const  {serviceName,description,categoryId,parentId}=req.request;  
            // console.log("->",req.request);
            const newService=await service_Add.NewService(req.request) 

            if(newService==SERVICE_MSG_CODE.ISEXIST){
              console.log(SERVICE_MSG.ISEXIST)
              return res(null,{status:RESPONSE_CODES.CONFLICT},);
            }

            return res(null,{msg:RESPONSE_CODES.CREATED},);
        } catch (err) {
          res(null, {msg:err});
        }
      }




//     new_sevice=async(req:Request,res:Response)=>{
//         try{
//             res.status(RESPONSE_CODES.CREATED).json({ message: SERVICE_MSG.CREATED, NewService: newService });
//         }
//         catch(error){
//             res.status(RESPONSE_CODES.INTERNAL_SERVER_ERROR).json({ message: error.message });
//         }
// }
}
export const serviceController=new ServiceController()
