"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const gateway_1 = require("./gateway");
let AppService = class AppService {
    constructor(socket) {
        this.socket = socket;
        this.stocks = [];
        this.prev_cost = [];
    }
    emitStock(stocks) {
        this.socket.server.emit('tradeStarted', stocks);
    }
    emitStatus(status) {
        this.socket.server.emit('tradeStatus', status);
    }
    init_Bidding(set) {
        this.Speed = parseFloat(set.Speed);
        this.stocks = set.stocks;
        if (!this.stocks.length)
            return;
        this.onedate = new Date(set.start_date);
        this.onedate.setHours(0, 0, 0, 0);
        this.twodate = new Date('11/22/2023');
        this.simulated();
    }
    simulated() {
        if (this.onedate.getTime() > this.twodate.getTime()) {
            this.emitStatus(false);
            return;
        }
        let cost_date = [];
        for (let i = 0; i < this.stocks.length; i++) {
            const stock_data = require('../JSON/' + this.stocks[i] + '.json');
            for (const day of stock_data) {
                const date_d = new Date(day.Date);
                if (date_d.getTime() === this.onedate.getTime()) {
                    const ratio = this.prev_cost[i] ? Math.floor((day.Open / this.prev_cost[i].cost - 1) * 1000) / 1000 : 0;
                    cost_date.push({
                        date: this.onedate.getDate() + '-' + (this.onedate.getMonth() + 1) + '-' + this.onedate.getFullYear(),
                        stock: this.stocks[i], cost: day.Open, ratio: ratio
                    });
                    break;
                }
                else if (date_d.getTime() < this.onedate.getTime()) {
                    const ratio = this.prev_cost[i] ? Math.floor((day.Open / this.prev_cost[i].cost - 1) * 1000) / 1000 : 0;
                    cost_date.push({
                        date: this.onedate.getDate() + '-' + (this.onedate.getMonth() + 1) + '-' + this.onedate.getFullYear(),
                        stock: this.stocks[i], cost: day.Open, ratio: ratio
                    });
                    break;
                }
            }
        }
        if (cost_date.length) {
            this.emitStock(cost_date);
            this.prev_cost = cost_date;
            this.emitStatus(true);
            let plus = 1;
            this.onedate.setDate(this.onedate.getDate() + plus);
            setTimeout(this.simulated.bind(this), this.Speed * 1000);
        }
    }
};
exports.AppService = AppService;
exports.AppService = AppService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [gateway_1.WebGateway])
], AppService);
//# sourceMappingURL=app.service.js.map