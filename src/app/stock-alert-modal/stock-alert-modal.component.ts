import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Validators, FormBuilder, FormGroup, FormControl, FormsModule,ReactiveFormsModule } from '@angular/forms';
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
  IonSelectOption,
  IonInput,
  
} from '@ionic/angular/standalone';

import { addIcons } from 'ionicons';
import { personCircle } from 'ionicons/icons';
import { ModalController } from '@ionic/angular';
import { rangeValidator } from '../validators/range.validator';
@Component({
  selector: 'app-stock-alert-modal',
  templateUrl: './stock-alert-modal.component.html',
  styleUrls: ['./stock-alert-modal.component.scss'],
  standalone:true,
  imports: [CommonModule,IonButton, IonContent, IonHeader, IonIcon, IonItem,
     IonLabel, IonList, IonModal, IonTitle, IonToolbar, IonGrid,IonCol,
     IonRow,IonSelect,IonSelectOption,IonInput,ReactiveFormsModule],

})
export class StockAlertModalComponent  implements OnInit {

  @Input() currentPrice!:String;
  @Input() stockSymbol!:String;
  name!:string;
  typesOfAlerts:string[];
  percentSelected:boolean;
  rangeSelected:boolean;
  from!:number;
  alertForm = new FormGroup({alertType: new FormControl(),
    from: new FormControl('',[Validators.required]),
    to: new FormControl('',[Validators.required]),
    percent: new FormControl()
  },  { validators: rangeValidator });

  constructor(private modalCtrl: ModalController) {
    addIcons({ personCircle });
    
    this.stockSymbol='';
    this.typesOfAlerts=["Percent","Range"];
    this.percentSelected=false;
    this.rangeSelected=false;
   }

  ngOnInit() {
   
  }

  handleChange(event: CustomEvent) {
    if(event.detail.value=='Percent'){
      this.percentSelected=true;
      this.rangeSelected=false;
    }
    if(event.detail.value=='Range'){
      this.percentSelected=false;
      this.rangeSelected=true;
    }
  }

  

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  onSubmit() {
    if (this.alertForm.valid) {
      console.log('Form Submitted:', this.alertForm.value);
    } else {
      console.error('Form Validation Errors:', this.rangeError);
    }
    return this.modalCtrl.dismiss(this.alertForm, 'confirm');
  }

  get rangeError() {
    return   this.alertForm.errors?.['rangeError'];
  }

  

}
