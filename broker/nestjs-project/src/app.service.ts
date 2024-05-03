import { Injectable } from '@nestjs/common';
import {WebGateway} from "./gateway";

@Injectable()
export class AppService {
  Speed: number;
  stocks = [];
  prev_cost = [];
  onedate: Date;
  twodate: Date;
  constructor(private readonly socket: WebGateway) {

  }
  emitStock(stocks: Update[]): void {
    this.socket.server.emit('tradeStarted', stocks)
  }
  emitStatus(status: boolean): void {
    this.socket.server.emit('tradeStatus', status);
  }

  init_Bidding(set: Bidding_set): void {
    this.Speed = parseFloat(set.Speed);
    this.stocks = set.stocks;
    if (!this.stocks.length)
      return;
    this.onedate = new Date(set.start_date);
    this.onedate.setHours(0,0,0,0);
    this.twodate = new Date('11/22/2023');
    this.simulated();
  }
  simulated(): void {
    if (this.onedate.getTime() > this.twodate.getTime()){
      this.emitStatus(false);
      return;
    }
    let cost_date = [];
    for (let i = 0; i < this.stocks.length; i++){
      const stock_data = require('../JSON/' + this.stocks[i] + '.json');
      for (const day of stock_data){
        const date_d = new Date(day.Date);
        if (date_d.getTime() === this.onedate.getTime()){
          const ratio = this.prev_cost[i] ? Math.floor((day.Open/this.prev_cost[i].cost-1)*1000)/1000 : 0;
          cost_date.push({
            date: this.onedate.getDate() + '-' + (this.onedate.getMonth() + 1) + '-' + this.onedate.getFullYear(),
            stock: this.stocks[i], cost: day.Open, ratio: ratio
          });
          break;
        } else if (date_d.getTime() < this.onedate.getTime()) {
          const ratio = this.prev_cost[i] ? Math.floor((day.Open/this.prev_cost[i].cost-1)*1000)/1000 : 0;
          cost_date.push({
            date: this.onedate.getDate() + '-' + (this.onedate.getMonth() + 1) + '-' + this.onedate.getFullYear(),
            stock: this.stocks[i], cost: day.Open, ratio: ratio
          });
          break;
        }
      }
    }
    if (cost_date.length){
      this.emitStock(cost_date);
      this.prev_cost = cost_date;
      this.emitStatus(true);
      let plus = 1;
      
      this.onedate.setDate(this.onedate.getDate()+plus);
      setTimeout(this.simulated.bind(this), this.Speed * 1000);
    }
  }
  
}

interface Bidding_set {
  start_date: string;
  Speed: string;
  stocks: string[];
}

interface Update {
  date: string;
  stock: string;
  cost: string;
  ratio: number;
}