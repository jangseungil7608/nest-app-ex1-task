import { Injectable } from "@nestjs/common";
import { EstateTransactionRepositoryInterface } from "../repositories/estate-transaction.repository.interface";
import { EstateTransaction } from "../../../../shared/interfaces/estate-transaction.interface";
import * as fs from "fs";
import * as path from "path";

@Injectable()
export class JsonEstateTransactionRepository implements EstateTransactionRepositoryInterface
{
  private data: EstateTransaction[] = [];

  constructor() {
    this.loadData();
  }

  // JSONファイルからデータを読み込み
  private loadData(): void {
    try {
        const filePath = path.join(process.cwd(), 'assets', 'estate_transactions.json');
        const rawData = fs.readFileSync(filePath, 'utf-8');
        this.data = JSON.parse(rawData);
        console.log("JSON data loaded successfully.");
    } catch (error) {
      console.error("Error loading JSON data:", error);
      this.data = [];
    }
  }

  // 条件に基づいてデータをフィルタリング
  async findByConditions(
    year: number,
    prefectureCode: number,
    type: number,
  ): Promise<EstateTransaction[]> {
    return this.data.filter(
      (transaction) =>
        transaction.year === year &&
        transaction.prefectureCode === prefectureCode &&
        transaction.type === type,
    );
  }
}