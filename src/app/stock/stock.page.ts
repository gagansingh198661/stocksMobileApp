import { Component, NgModule, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InfoDTO } from '../models/InfoDTO';
import { ModalController } from '@ionic/angular';
import { StockAlertModalComponent } from '../stock-alert-modal/stock-alert-modal.component';
import { FormGroup } from '@angular/forms';
import { CreateAlertRequest } from '../request/CreateAlertRequest';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.page.html',
  styleUrls: ['./stock.page.scss'],
  standalone: false,
})


export class StockPage implements OnInit {

  infoDTO! : InfoDTO;
  alertForm!:FormGroup;
  constructor(private route:ActivatedRoute,private modalCtrl:ModalController) { 
    route.queryParams.subscribe(info=>{
      this.infoDTO=JSON.parse(info['result']);
      console.log(this.infoDTO);
    });
    
  }

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: StockAlertModalComponent,
      componentProps: { stockSymbol: this.infoDTO.stock.stockSymbol,
        currentPrice:this.infoDTO.stock.currentPrice
       }
    });
    modal.present();

    const { data , role }= await modal.onDidDismiss();
    

    //  if (role === 'confirm') {
    //    const alertRequest = new CreateAlertRequest(data.stockSymbol,data.alertType,data.from,data.to,
    //     data.percent);
    //  }
  }

  ngOnInit() {
  }

}
