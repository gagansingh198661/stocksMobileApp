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
     IonLabel, IonGrid,IonCol,
     IonRow,IonSelect,IonSelectOption,IonInput,ReactiveFormsModule],
})
export class StockAlertModalComponent  implements OnInit {

  @Input() currentPrice!:String;
  @Input() stockSymbol!:String;
  name!:string;
  typesOfAlerts:string[];
  percentSelected:boolean;
  rangeSelected:boolean;
  alertForm = new FormGroup({alertType: new FormControl(),
    from: new FormControl('',[Validators.required]),
    to: new FormControl('',[Validators.required]),
    percent: new FormControl('',[Validators.required])
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
      this.alertForm.controls.from.reset();
    }
    if(event.detail.value=='Range'){
      this.percentSelected=false;
      this.rangeSelected=true;
      this.alertForm.controls.percent.reset();
    }
  }

  

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  onSubmit() {
    if (this.alertForm.valid) {
      console.log('Form Submitted:', this.alertForm.value);
      return this.modalCtrl.dismiss(this.alertForm, 'confirm');
    } else {
      return Promise.resolve(false);
    }
    
  }

  get rangeError() {
    return   this.alertForm.errors?.['rangeError'];
  }

  getError(controlName: string): string | null {
    const control = this.alertForm.get(controlName);
    if (control?.errors) {
      if (control.errors['required']) {
        return `${controlName} is required`;
      } 
    }
    return null;
  }

  

}
