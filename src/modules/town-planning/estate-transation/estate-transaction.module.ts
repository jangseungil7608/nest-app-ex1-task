import { Module } from "@nestjs/common";
import { EstateTransactionController } from "./controllers/estate-transaction.controller";
import { GetEstateTransactionUseCase } from "./use-cases/get-estate-transaction.use-case";
import { JsonEstateTransactionRepository } from "./infrasturcture/json-estate-transaction.repository";

@Module({
  controllers: [EstateTransactionController],
  providers: [
    GetEstateTransactionUseCase,
    {
      provide: 'EstateTransactionRepository',
      useClass: JsonEstateTransactionRepository,
    },
  ],
})
export class EstateTransactionModule {}