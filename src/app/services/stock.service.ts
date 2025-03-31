import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, interval, map, Observable, Subscription, throwError } from 'rxjs';
import { Stock } from '../models/Stock';
import { InfoDTO } from '../models/InfoDTO';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  public stocksData!: InfoDTO[];

  url = "http://localhost:8080/getData";
  constructor(private http:HttpClient) {
  }

  updateStocksData(){
     return this.http.get<InfoDTO[]>(this.url);//.subscribe(value=>this.stocksData=value);
   // console.log(this.stocksData);
     //this.stocksData.subscribe(value=> console.log(value));
  }

  public getStocksData():Observable<InfoDTO[]>{
    return this.updateStocksData();

  }

}


