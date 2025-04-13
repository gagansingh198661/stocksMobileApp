import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StockAlertModalComponent } from '../stock-alert-modal/stock-alert-modal.component';
import { IonCol, IonGrid, IonRow } from '@ionic/angular';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StockAlertModalComponent
  ],
  exports: [StockAlertModalComponent]
})
export class StockAlertSharedModuleModule { }
