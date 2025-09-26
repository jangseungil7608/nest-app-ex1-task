
export interface EstateTransaction {
  year: number;
  prefectureCode: number;
  type: number;
  data: {
    result: {
      prefectureCode: string;
      prefectureName: string;
      type: string;
      years: Array<{
        year: number;
        value: number;
      }>;
    };
  };
}