import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StockPageRoutingModule } from './stock-routing.module';

import { StockPage } from './stock.page';
import { StockAlertSharedModuleModule } from '../stock-alert-shared-module/stock-alert-shared-module.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StockPageRoutingModule,
    StockAlertSharedModuleModule
  ],
  declarations: [StockPage]
})
export class StockPageModule {}
