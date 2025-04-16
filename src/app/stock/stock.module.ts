import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { IonicModule, ModalController } from '@ionic/angular';

import { StockPageRoutingModule } from './stock-routing.module';

import { StockPage } from './stock.page';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    StockPageRoutingModule,
    
  ],
  declarations: [StockPage]
})
export class StockPageModule {}
