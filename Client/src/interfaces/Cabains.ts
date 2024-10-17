import { IReserve } from "./Reserve";

 export interface Cabains {
    id: number;
    cabainName: string;
    price: number;
    wifi: string;
    hotWater: string;
    capacity: number;
    reservations: IReserve[]
  }
  