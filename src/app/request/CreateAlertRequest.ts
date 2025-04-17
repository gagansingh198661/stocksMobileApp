export class CreateAlertRequest{
    constructor(private stockSymbol:string,
        private alertType:string,
        private from:string,
        private to:string,
        private percent:string
    ){

    }
}