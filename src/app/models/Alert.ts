export interface Alert {
    stocksymbol : String;
    lowerlimit : number;
    upperlimit : number;
    active:boolean;
    percent:number;
    alertType:String;
}