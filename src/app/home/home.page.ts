import { Component } from '@angular/core';
import { StockService } from '../services/stock.service';
import { interval, Observable, Subscription,pipe } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { Stock } from '../models/Stock';
import { InfoDTO } from '../models/InfoDTO';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {

  infoDTOList!: InfoDTO[] ;
  constructor(private stockService:StockService) {    
    interval(10000).subscribe( val => this.save() )
  }

  public save(){
     this.stockService.getStocksData().subscribe(value=>this.infoDTOList =(value));
    console.log(this.infoDTOList);
  }

}
