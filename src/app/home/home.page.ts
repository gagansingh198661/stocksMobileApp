import { Component } from '@angular/core';
import { StockService } from '../services/stock.service';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {

  constructor(private stockService:StockService) {
    this.save();
  }

  public save(){
    console.log("save");
  }

}
