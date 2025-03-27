import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { interval, Observable, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  public stocksData:any ;

  url = "http://localhost:8080/getData";
  constructor(private http:HttpClient) {
  }

  updateStocksData(){
    this.stocksData = this.http.get(this.url, {observe : 'response'});
  }

  public getStocksData():Observable<HttpResponse<Object>>{
    this.updateStocksData();
    return this.stocksData;
  }

}


