import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InfoDTO } from '../models/InfoDTO';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.page.html',
  styleUrls: ['./stock.page.scss'],
  standalone: false,
})
export class StockPage implements OnInit {

  infoDTO! : InfoDTO
  constructor(private route:ActivatedRoute) { 
    route.queryParams.subscribe(info=>{
      this.infoDTO=JSON.parse(info['result']);
      console.log(this.infoDTO);
    });
    
  }

  ngOnInit() {
  }

}
