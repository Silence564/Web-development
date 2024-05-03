import { WebGateway } from "./gateway";
export declare class AppService {
    private readonly socket;
    Speed: number;
    stocks: any[];
    prev_cost: any[];
    onedate: Date;
    twodate: Date;
    constructor(socket: WebGateway);
    emitStock(stocks: Update[]): void;
    emitStatus(status: boolean): void;
    init_Bidding(set: Bidding_set): void;
    simulated(): void;
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
export {};
