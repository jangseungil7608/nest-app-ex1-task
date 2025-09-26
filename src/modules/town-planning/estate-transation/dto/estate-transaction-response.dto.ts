export class EstateTransactionResponseDto {
  year: number;
  prefectureCode: number;
  prefectureName: string;
  type: number;
  value: number;
  
  constructor(data: {
    year: number;
    prefectureCode: number;
    prefectureName: string;
    type: number;
    value: number;
  }) {
    this.year = data.year;
    this.prefectureCode = data.prefectureCode;
    this.prefectureName = data.prefectureName;
    this.type = data.type;
    this.value = data.value;
  }
}