import { IsInt, IsIn, Min, Max } from 'class-validator';
import { Transform } from 'class-transformer';

export class EstateTransactionQueryDto {
  @Transform(({ value }) => parseInt(value))
  @IsInt({ message: '年度は数字で入力してください' })
  @Min(2015, { message: '2015年から2018年の値を指定してください' })
  @Max(2018, { message: '2015年から2018年の値を指定してください' })
  year: number; // 年度

  @Transform(({ value }) => parseInt(value))
  @IsInt({ message: '都道府県（関東のみ）は数字で入力してください' })
  @IsIn([8, 9, 10, 11, 12, 13, 14], {
    message: '都道府県（関東のみ）は (8, 9, 10, 11, 12, 13, 14)のいずれかを指定してください',
  })
  prefectureCode: number; // 都道府県コード（関東のみ）

  @Transform(({ value }) => parseInt(value))
  @IsInt({ message: '場所は数字で入力してください' })
  @IsIn([1, 2], { message: '場所は 1 (住居地) か 2 (商業地)を指定してください' })
  type: number; // 場所 (1: 住居地, 2: 商業地)
}