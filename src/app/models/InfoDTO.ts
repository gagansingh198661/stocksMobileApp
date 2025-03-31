import { AlertDTO } from "./AlertDTO";
import { Stock } from "./Stock";

export interface InfoDTO {
    action : String;
    stock : Stock;
    alertDTOList : AlertDTO[];
}
