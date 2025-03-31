export interface Stock {
    userId: number;
    lowestPrice: number;
    stockSymbol: string;
    name: string;
    highestPrice: number;
    currentPrice: number;
    targetPrice: number;
    previousPrice: number;
    active:boolean;
    own:boolean;
    boughtPrice:number;
  }