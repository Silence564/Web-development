import {Controller, Get, HttpStatus, Res, Param, Post, Put, Body, Delete} from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';
import { Broker } from './class/Broker';
import { Bidding } from './class/Bidding';
import { Transfer } from './class/Transfer';
import { User } from './class/User';
import {addNewBroker, deleteBroker, editBrokerById, getBroker, addStockToBroker, find_person, sellStock} from './edit';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get('getbroker:name')
  getBroker(@Res() res: Response, @Param() params){
    res.status(HttpStatus.OK).json(getBroker(params.name));
  }
  @Get('brokers')
  getBrokers(@Res() res: Response){
    res.status(HttpStatus.OK).json(require('../JSON/brokers.json'));
  }
  @Get('stock')
  getStocks(@Res() res: Response){
    res.status(HttpStatus.OK).json(require('../JSON/stock.json'));
  }
  @Get('getstock:stock')
  getStockData(@Res() res: Response, @Param() params){
    res.status(HttpStatus.OK).json(require('../JSON/' + params.stock + '.json'));
  }
  @Post('starttrade')
  startTrade(@Body() body: Bidding){
    this.appService.init_Bidding(body);
  }
  @Post('addbroker')
  addBroker(@Body() body: Broker){
    addNewBroker(body);
  }
  @Put('editbroker:id')
  editBroker(@Param() params, @Body() body: Broker){
    console.log("broker " + params.id + " updated on ");
    console.log(body);
    editBrokerById(params.id, body);
  }
  
  @Put('buystock')
  buyStock(@Body() body: Transfer){
    addStockToBroker(body.broker, body.stock, body.cost, body.count);
  }
  @Put('sellstock')
  sellStock(@Body() body: Transfer) {
    sellStock(body.broker, body.stock, body.cost, body.count);
  }
  @Delete('delbroker:id')
  delBroker(@Param() params){
    deleteBroker(params.id);
  }

  @Put('login')
  loginUser(@Res() res: Response, @Body() body: User) {
    res.status(HttpStatus.OK).json(find_person(body.login, body.password));
  }
}
