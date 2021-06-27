export class Commodity {
  name?: string;
  count!: number;
}

export interface CommodityResponse {
  data: number;
  transactionTime: string
}
