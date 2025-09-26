import { EstateTransaction } from '../../../../shared/interfaces/estate-transaction.interface';

export interface EstateTransactionRepositoryInterface {
  findByConditions(
    year: number,
    prefectureCode: number,
    type: number,
  ): Promise<EstateTransaction[]>;
}