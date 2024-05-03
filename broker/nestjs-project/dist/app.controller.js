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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
const Broker_1 = require("./class/Broker");
const Bidding_1 = require("./class/Bidding");
const Transfer_1 = require("./class/Transfer");
const User_1 = require("./class/User");
const edit_1 = require("./edit");
let AppController = class AppController {
    constructor(appService) {
        this.appService = appService;
    }
    getBroker(res, params) {
        res.status(common_1.HttpStatus.OK).json((0, edit_1.getBroker)(params.name));
    }
    getBrokers(res) {
        res.status(common_1.HttpStatus.OK).json(require('../JSON/brokers.json'));
    }
    getStocks(res) {
        res.status(common_1.HttpStatus.OK).json(require('../JSON/stock.json'));
    }
    getStockData(res, params) {
        res.status(common_1.HttpStatus.OK).json(require('../JSON/' + params.stock + '.json'));
    }
    startTrade(body) {
        this.appService.init_Bidding(body);
    }
    addBroker(body) {
        (0, edit_1.addNewBroker)(body);
    }
    editBroker(params, body) {
        console.log("broker " + params.id + " updated on ");
        console.log(body);
        (0, edit_1.editBrokerById)(params.id, body);
    }
    buyStock(body) {
        (0, edit_1.addStockToBroker)(body.broker, body.stock, body.cost, body.count);
    }
    sellStock(body) {
        (0, edit_1.sellStock)(body.broker, body.stock, body.cost, body.count);
    }
    delBroker(params) {
        (0, edit_1.deleteBroker)(params.id);
    }
    loginUser(res, body) {
        res.status(common_1.HttpStatus.OK).json((0, edit_1.find_person)(body.login, body.password));
    }
};
exports.AppController = AppController;
__decorate([
    (0, common_1.Get)('getbroker:name'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getBroker", null);
__decorate([
    (0, common_1.Get)('brokers'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getBrokers", null);
__decorate([
    (0, common_1.Get)('stock'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getStocks", null);
__decorate([
    (0, common_1.Get)('getstock:stock'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getStockData", null);
__decorate([
    (0, common_1.Post)('starttrade'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Bidding_1.Bidding]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "startTrade", null);
__decorate([
    (0, common_1.Post)('addbroker'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Broker_1.Broker]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "addBroker", null);
__decorate([
    (0, common_1.Put)('editbroker:id'),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Broker_1.Broker]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "editBroker", null);
__decorate([
    (0, common_1.Put)('buystock'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Transfer_1.Transfer]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "buyStock", null);
__decorate([
    (0, common_1.Put)('sellstock'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Transfer_1.Transfer]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "sellStock", null);
__decorate([
    (0, common_1.Delete)('delbroker:id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "delBroker", null);
__decorate([
    (0, common_1.Put)('login'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, User_1.User]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "loginUser", null);
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [app_service_1.AppService])
], AppController);
//# sourceMappingURL=app.controller.js.map