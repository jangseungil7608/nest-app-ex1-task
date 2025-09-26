import { Injectable, Inject } from '@nestjs/common';
import type { EstateTransactionRepositoryInterface } from '../repositories/estate-transaction.repository.interface';
import { EstateTransactionResponseDto } from '../dto/estate-transaction-response.dto';

@Injectable()
export class GetEstateTransactionUseCase {
  constructor(
    @Inject('EstateTransactionRepository')
    private readonly estateTransactionRepository: EstateTransactionRepositoryInterface,
  ) {}

    async execute(
        year: number,
        prefectureCode: number,
        type: number,
    ) : Promise<EstateTransactionResponseDto[]> {
        const transactions = await this.estateTransactionRepository.findByConditions(
            year, 
            prefectureCode, 
            type
        );

        console.log('Retrieved transactions:', transactions);

        return transactions.map((transaction) => {
            const yearData = transaction.data.result.years.find((y) => y.year === year);
            return new EstateTransactionResponseDto({
                year: transaction.year,
                prefectureCode: transaction.prefectureCode,
                prefectureName: transaction.data.result.prefectureName,
                type: transaction.type,
                value: yearData?.value || 0,
            });
        });
    }
}  