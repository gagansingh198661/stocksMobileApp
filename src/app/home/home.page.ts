import { Component } from '@angular/core';
import { StockService } from '../services/stock.service';
import { interval } from 'rxjs';
import { InfoDTO } from '../models/InfoDTO';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {

  infoDTOList!: InfoDTO[] ;
  constructor(private stockService:StockService,private router:Router) {    
    interval(10000).subscribe( val => this.getUpdatedData() )
  }

  public getUpdatedData(){
    this.stockService.getStocksData().subscribe(value=>this.infoDTOList =(value));
    console.log(this.infoDTOList);
  }

  public viewStock(infoDTO:InfoDTO){
      this.router.navigate(['/stock'],{
        queryParams:{
          'result' : infoDTO.stock.stockSymbol
        }
      })
  }

}
