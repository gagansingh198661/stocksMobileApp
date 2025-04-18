import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, interval, map, Observable, Subscription, throwError } from 'rxjs';
import { Stock } from '../models/Stock';
import { InfoDTO } from '../models/InfoDTO';
import { CreateAlertRequest } from '../request/CreateAlertRequest';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  public stocksData!: InfoDTO[];

  url = "http://localhost:8080";
  constructor(private http:HttpClient) {
  }

  updateStocksData(){
     return this.http.get<InfoDTO[]>(this.url+"/getData");//.subscribe(value=>this.stocksData=value);
   // console.log(this.stocksData);
     //this.stocksData.subscribe(value=> console.log(value));
  }

  public getStocksData():Observable<InfoDTO[]>{
    return this.updateStocksData();

  }

  public createAlert(alertRequest:CreateAlertRequest){
    console.log(alertRequest);
    this.http.post(this.url+"/alert/createAlert",alertRequest).subscribe(
      (response)=> {
        console.log('Alert Created : ',response);
      },
      (error)=>{
        console.error('Error creating Alert : ',error);
      }
    );
  }

  public getStockData(stockSymbol : string):Observable<InfoDTO>{
    return this.http.get<InfoDTO>(this.url+"/getStock?stockSymbol="+stockSymbol);
  }

  public deleteAlert(id : number):Observable<InfoDTO>{
    return this.http.delete<InfoDTO>(this.url+"/alert/deleteAlert?id="+id);
  }

}


