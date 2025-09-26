import { Controller, Get, Query, ValidationPipe } from "@nestjs/common";
import { GetEstateTransactionUseCase } from "../use-cases/get-estate-transaction.use-case";
import { EstateTransactionQueryDto } from "../dto/estate-transation-query.dto";
import { EstateTransactionResponseDto } from "../dto/estate-transaction-response.dto";

@Controller('api/v1/townPlanning/estateTransaction')
export class EstateTransactionController {
    constructor(private readonly getEstateTransactionUseCase: GetEstateTransactionUseCase) {}

    @Get('bar')
    async getEstateTransactions(
        @Query(new ValidationPipe({ transform: true })) query: EstateTransactionQueryDto
    ): Promise<EstateTransactionResponseDto[]> {
        const { year, prefectureCode, type } = query;
        return this.getEstateTransactionUseCase.execute(
            year, 
            prefectureCode, 
            type
        );
    }
}