import { Component, Input, OnInit } from '@angular/core';
import { CommonModule, UpperCasePipe } from '@angular/common';
import { StockService } from '../services/stock.service';
import { Alert } from '../models/Alert';
import { Validators, FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
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
import { CreateAlertRequest } from '../request/CreateAlertRequest';
@Component({
  selector: 'app-stock-alert-modal',
  templateUrl: './stock-alert-modal.component.html',
  styleUrls: ['./stock-alert-modal.component.scss'],
  standalone:true,
  imports: [CommonModule,IonButton, IonContent, 
      IonGrid,IonCol,
     IonRow,IonSelect,IonSelectOption,IonInput,ReactiveFormsModule],
})
export class StockAlertModalComponent  implements OnInit {

  @Input() currentPrice!:String;
  @Input() stockSymbol!:string;
  @Input() alerts!:Alert[];
  name!:string;
  typesOfAlerts:string[];
  percentSelected:boolean;
  targetSelected:boolean;
  alertForm = new FormGroup({alertType: new FormControl(),
    from: new FormControl(''),
    to: new FormControl(''),
    percent: new FormControl('')
  },  { validators: rangeValidator });
  
  constructor(private modalCtrl: ModalController,private stockService:StockService) {
    addIcons({ personCircle });
    
    this.typesOfAlerts=["Percent","Target"];
    this.percentSelected=false;
    this.targetSelected=false;
   }

  ngOnInit() {
   
  }

  handleChange(event: CustomEvent) {
    if(event.detail.value=='Percent'){
      this.percentSelected=true;
      this.targetSelected=false;
      this.alertForm.controls.from.reset();
    }
    if(event.detail.value=='Target'){
      this.percentSelected=false;
      this.targetSelected=true;
      this.alertForm.controls.percent.reset();
    }
  }

  

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  onSubmit() {
    if (this.alertForm.valid) {
      if(this.validateAlarm(this.alertForm)){
        this.createAlarm(this.alertForm);
        console.log('Form Submitted:', this.alertForm.value);
      }else{
        console.log("invalid");
      }
      
      return this.modalCtrl.dismiss(this.alertForm.value, 'confirm');
    } else {
      console.log("error");
      return Promise.resolve(false);
    }
    
  }
  validateAlarm(alertForm: FormGroup):boolean {
    for(const alert of this.alerts ){
      if(alert.alertType.toLowerCase() === (alertForm.value.alertType as string).toLowerCase()){
        if(alert.alertType.toLowerCase() === 'percent'){
          const percentStr = alertForm.value.percent.toString();
          if(alert.percent.toString() === percentStr){
            return false;
          }
        }
      }
    }
    return true;
    
  }

  get rangeError() {
    return   this.alertForm.errors?.['rangeError'];
  }

  getError(controlName: string): string | null {
    const control = this.alertForm.get(controlName);
    if (control?.errors) {
      if (control.errors['required']) {
        console.log(controlName);

        return `${controlName} is required`;
      } 
    }
    return null;
  }

  createAlarm(alertForm:FormGroup) {
    const alertType = (alertForm.value.alertType as string).toUpperCase();
    const request = new CreateAlertRequest(this.stockSymbol,
                                            alertType,
                                            alertForm.value.from,
                                            alertForm.value.to,
                                            alertForm.value.percent);
    console.log(request);                                        
    this.stockService.createAlert(request);
  }

}
  

