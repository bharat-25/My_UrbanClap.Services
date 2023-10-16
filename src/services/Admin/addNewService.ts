import { Model } from 'sequelize';
import serviceModel from "../../models/newService.model"
import { SERVICE_MSG, SERVICE_MSG_CODE } from "../../responses/response"



class add_new_service{
    NewService=async(payload:any)=>{
        try{
            const isexist= await serviceModel.findOne({where:{categoryId:payload.categoryId}})
            
            if(isexist){
                console.log()
                return SERVICE_MSG_CODE.ISEXIST;
            }
            const addNewService=await serviceModel.create({
                serviceName:payload.serviceName,
                description:payload.description,
                categoryId:payload.categoryId,
                parentId:payload.parentId,
            });
            console.log("-------->>",addNewService)
            return addNewService;

        }catch(error){
            throw new Error(error.message)
        }
    }
}

export const service_Add=new add_new_service()