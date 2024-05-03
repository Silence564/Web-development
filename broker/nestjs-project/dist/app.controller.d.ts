import { AppService } from './app.service';
import { Response } from 'express';
import { Broker } from './class/Broker';
import { Bidding } from './class/Bidding';
import { Transfer } from './class/Transfer';
import { User } from './class/User';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getBroker(res: Response, params: any): void;
    getBrokers(res: Response): void;
    getStocks(res: Response): void;
    getStockData(res: Response, params: any): void;
    startTrade(body: Bidding): void;
    addBroker(body: Broker): void;
    editBroker(params: any, body: Broker): void;
    buyStock(body: Transfer): void;
    sellStock(body: Transfer): void;
    delBroker(params: any): void;
    loginUser(res: Response, body: User): void;
}
