import { Component, NgModule, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InfoDTO } from '../models/InfoDTO';
import { ModalController } from '@ionic/angular';
import { StockAlertModalComponent } from '../stock-alert-modal/stock-alert-modal.component';
import { FormGroup } from '@angular/forms';
import { CreateAlertRequest } from '../request/CreateAlertRequest';
import { StockService } from '../services/stock.service';
import { interval } from 'rxjs';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.page.html',
  styleUrls: ['./stock.page.scss'],
  standalone: false,
})


export class StockPage implements OnInit {
  stockSymbol!:string;
  infoDTO! : InfoDTO;
  alertForm!:FormGroup;
  constructor(private route:ActivatedRoute,
    private modalCtrl:ModalController,
    private stockService : StockService ) { 
    route.queryParams.subscribe(params=>{
      this.stockSymbol=params['result'];
      this.getUpdatedData(this.stockSymbol);  
      interval(100000).subscribe( val => this.getUpdatedData(this.stockSymbol));
    });
    
    
  }
  getUpdatedData(stockSymbolInner:string): void {
    this.stockService.getStockData(stockSymbolInner).subscribe((value)=>{
      this.infoDTO = value;
      console.log(this.infoDTO)
    });
  }

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: StockAlertModalComponent,
      componentProps: { stockSymbol: this.infoDTO.stock.stockSymbol,
        currentPrice:this.infoDTO.stock.currentPrice,alerts:this.infoDTO.alerts
       }
    });
    modal.present();
    const { data , role }= await modal.onDidDismiss();
    this.stockService.getStockData(this.stockSymbol);
    
    //  if (role === 'confirm') {
    //    const alertRequest = new CreateAlertRequest(data.stockSymbol,data.alertType,data.from,data.to,
    //     data.percent);
    //  }
  }

  ngOnInit() {
  }

  deleteAlert(id:number){
    console.log(id);
    this.stockService.deleteAlert(id).subscribe((value)=>{
      this.getUpdatedData(this.infoDTO.stock.stockSymbol);
    });
    
  }
}
