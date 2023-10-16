import { DataTypes, Model } from "sequelize";
import { sequelize } from "../databases/DBconn";


class serviceModel extends Model{
    public id!:number;
    public serviceName!:string;
    public description!:string;
    public categoryId!:number;
    public parentId!:[number];
    public price!:number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

}
serviceModel.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      serviceName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      categoryId:{
        type:DataTypes.INTEGER,
        allowNull:false,
      },
      parentId:{
        type:DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull:true,
      },

},
{
    sequelize,
    modelName: 'services',
    timestamps:true
  })

serviceModel.sync({alter:true})

export default serviceModel;