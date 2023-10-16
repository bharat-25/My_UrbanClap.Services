import grpc, { Server, ServerCredentials, loadPackageDefinition } from "@grpc/grpc-js";
import path from "path";
import { PackageDefinition, loadSync } from "@grpc/proto-loader";
import { ServiceRouter } from "../routes/service.route";
export class GRPCClass {
  private protoFilePath = path.resolve(
    __dirname,
    `${process.cwd()}/proto/newservice.proto`
  );
  public AddServicePackage: any;
  public grpcServer!: Server;
  constructor() {
    this.startGrpcServer()
  }
  private startGrpcServer(){
    this.loadGRPC();
    this.grpcServer = new Server();
    this.loadServiceDefinition();
    this.initServer();
  }
  private loadGRPC() {
      try {
      const packageDef: PackageDefinition = loadSync(
        path.resolve(__dirname, this.protoFilePath),
        {
            keepCase: true,
            longs: String,
            enums: String,
            defaults: true,
            oneofs: true,
        }
      );
      const grpcObject = loadPackageDefinition(packageDef);
      this.AddServicePackage = grpcObject.AddServicePackage;
    } catch (err) {
      console.log(err);
    }
  }
  private loadServiceDefinition() {
    ServiceRouter.loadService(this.grpcServer, this.AddServicePackage);
  }
  private initServer() {
    this.grpcServer.bindAsync(
      `0.0.0.0:8000`,
      ServerCredentials.createInsecure(),
      this.grpcCallback
    );
  }
  private grpcCallback = (err: Error | null, port: number): void => {
    if (err) {
      console.error(err);
      return;
    }
    this.grpcServer.start();
    console.log(`gRPC server listening on ${port}`);
  };
}
