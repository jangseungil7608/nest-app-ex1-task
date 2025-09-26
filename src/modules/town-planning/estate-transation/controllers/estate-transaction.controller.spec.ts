import { Test, TestingModule } from '@nestjs/testing';
import { EstateTransactionController } from './estate-transaction.controller';
import { GetEstateTransactionUseCase } from '../use-cases/get-estate-transaction.use-case';
import { EstateTransactionResponseDto } from '../dto/estate-transaction-response.dto';
import { EstateTransactionQueryDto } from '../dto/estate-transation-query.dto';

describe('EstateTransactionController', () => {
  let controller: EstateTransactionController;
  let getEstateTransactionUseCase: GetEstateTransactionUseCase;

  const mockUseCase = {
    execute: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EstateTransactionController],
      providers: [
        {
          provide: GetEstateTransactionUseCase,
          useValue: mockUseCase,
        },
      ],
    }).compile();
    
    controller = module.get<EstateTransactionController>(EstateTransactionController);
    getEstateTransactionUseCase = module.get<GetEstateTransactionUseCase>(GetEstateTransactionUseCase);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

    describe('getEstateTransactions', () => {
        it('should return an array of EstateTransactionResponseDto', async () => {
            const query: EstateTransactionQueryDto = {
                year: 2015,
                prefectureCode: 13,
                type: 1,
            };

            const result: EstateTransactionResponseDto[] = [
                new EstateTransactionResponseDto({
                    year: 2015,
                    prefectureCode: 13,
                    prefectureName: "大阪府", // ❌ 間違った都道府県名
                    type: 1,
                    value: 999999, // ❌ 間違った価格
                }),
            ];

            mockUseCase.execute.mockResolvedValue([
                new EstateTransactionResponseDto({
                year: 2015,
                prefectureCode: 13,
                prefectureName: "東京都", // ✅ 正しい値
                type: 1,
                value: 324740, // ✅ 正しい値
                }),
            ]);

            const response = await controller.getEstateTransactions(query);

            expect(response).toEqual(result);
            expect(getEstateTransactionUseCase.execute).toHaveBeenCalledWith(
                query.year,
                query.prefectureCode,
                query.type,
            );
            expect(getEstateTransactionUseCase.execute).toHaveBeenCalledTimes(1);
        });
    });
});