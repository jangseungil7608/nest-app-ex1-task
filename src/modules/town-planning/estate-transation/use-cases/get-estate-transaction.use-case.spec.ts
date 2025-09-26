import { Test, TestingModule } from '@nestjs/testing';
import { GetEstateTransactionUseCase } from './get-estate-transaction.use-case';
import { EstateTransactionRepositoryInterface } from '../repositories/estate-transaction.repository.interface';
import { EstateTransaction } from '../../../../shared/interfaces/estate-transaction.interface';

describe('GetEstateTransactionUseCase', () => {
  let useCase: GetEstateTransactionUseCase;
  let repository: EstateTransactionRepositoryInterface;

  const mockRepository = {
    findByConditions: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetEstateTransactionUseCase,
        {
          provide: 'EstateTransactionRepository',
          useValue: mockRepository,
        },
      ],
    }).compile();

    useCase = module.get<GetEstateTransactionUseCase>(GetEstateTransactionUseCase);
    repository = module.get<EstateTransactionRepositoryInterface>('EstateTransactionRepository');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  describe('execute', () => {
    it('should return formatted estate transaction data', async () => {
      const mockData: EstateTransaction[] = [
        {
          year: 2015,
          prefectureCode: 13,
          type: 1,
          data: {
            result: {
              prefectureCode: "13",
              prefectureName: "東京都",
              type: "1",
              years: [
                {
                  year: 2015,
                  value: 324740,
                },
              ],
            },
          },
        },
      ];

      mockRepository.findByConditions.mockResolvedValue(mockData);

      const result = await useCase.execute(2015, 13, 1);

      expect(result).toHaveLength(1);
      expect(result[0]).toMatchObject({
        year: 2015,
        prefectureCode: 13,
        prefectureName: "東京都",
        type: 1,
        value: 324740,
      });
      expect(repository.findByConditions).toHaveBeenCalledWith(2015, 13, 1);
      expect(repository.findByConditions).toHaveBeenCalledTimes(1);
    });

    it('should return empty array when no data found', async () => {
      mockRepository.findByConditions.mockResolvedValue([]);

      const result = await useCase.execute(2015, 13, 1);

      expect(result).toEqual([]);
      expect(repository.findByConditions).toHaveBeenCalledWith(2015, 13, 1);
    });
  });
});