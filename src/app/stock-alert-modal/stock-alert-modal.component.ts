import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonTitle,
  IonToolbar,
  IonGrid,
  IonRow,
  IonCol,
  IonSelect,
  IonSelectOption
} from '@ionic/angular/standalone';

import { addIcons } from 'ionicons';
import { personCircle } from 'ionicons/icons';
@Component({
  selector: 'app-stock-alert-modal',
  templateUrl: './stock-alert-modal.component.html',
  styleUrls: ['./stock-alert-modal.component.scss'],
  standalone:true,
  imports: [CommonModule,IonButton, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonModal, IonTitle, IonToolbar, IonGrid,IonCol,IonRow,IonSelect,IonSelectOption],

})
export class StockAlertModalComponent  implements OnInit {

  @Input() currentPrice:String;
  typesOfAlerts:string[];
  percentSelected:boolean;
  rangeSelected:boolean;
  constructor() {
    addIcons({ personCircle });
    this.currentPrice='';
    this.typesOfAlerts=["Percent","Range"];
    this.percentSelected=false;
    this.rangeSelected=false;
   }

  ngOnInit() {}

  handleChange(event: CustomEvent) {
    if(event.detail.value=='Percent'){
      this.percentSelected=true;
      this.rangeSelected=false;
    }
    if(event.detail.value=='Range'){
      this.percentSelected=false;
      this.rangeSelected=true;
    }
    console.log('ionChange fired with value: ' + event.detail.value);
  }

}
