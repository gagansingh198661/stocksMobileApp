import { Component } from '@angular/core';
import { StockService } from '../services/stock.service';
import { interval, Observable, Subscription } from 'rxjs';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {

  private stocksData : any;

  constructor(private stockService:StockService) {
    
    interval(10000).subscribe( val => this.save() )
  }

  public  save(){
    console.log("save");
    const req = this.stockService.getStocksData() as Observable<HttpResponse<Object>>;
    req.subscribe(resp=> {
      this.stocksData = {...resp.body!};
    });
    console.log('response : '+JSON.stringify(this.stocksData));
  }

}
