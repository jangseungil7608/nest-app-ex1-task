export class EstateTransactionResponseDto {
  year: number;
  prefectureCode: number;
  type: number;
  value: number;
  
  constructor(data: {
    year: number;
    prefectureCode: number;
    type: number;
    value: number;
  }) {
    this.year = data.year;
    this.prefectureCode = data.prefectureCode;
    this.type = data.type;
    this.value = data.value;
  }
}