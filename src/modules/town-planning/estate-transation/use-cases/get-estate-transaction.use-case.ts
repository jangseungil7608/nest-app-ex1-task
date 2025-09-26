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

        return transactions.map(
            (transaction) =>
                new EstateTransactionResponseDto({
                year: transaction.year,
                prefectureCode: transaction.prefectureCode,
                type: transaction.type,
                value: transaction.value,
                }),
        );
    }



}  