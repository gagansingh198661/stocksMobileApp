import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { interval } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  url = "http://localhost:8080/getData";
  constructor(private http:HttpClient) {
    interval(10000).subscribe( val=> this.getStocksData() );  
  }

  getStocksData(){
    const req = this.http.get(this.url, {observe : 'response'});
    req.subscribe(resp => {
      console.log({...resp.body!})
    });
  }

}


