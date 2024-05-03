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
exports.WebGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
let WebGateway = class WebGateway {
    handleEvent(message) {
        this.server.emit('newBroker', true);
    }
    emitTrade(message) {
        this.server.emit('tradeStarted', []);
    }
};
exports.WebGateway = WebGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", Object)
], WebGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('addBroker'),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], WebGateway.prototype, "handleEvent", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('startTrade'),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], WebGateway.prototype, "emitTrade", null);
exports.WebGateway = WebGateway = __decorate([
    (0, websockets_1.WebSocketGateway)(4020)
], WebGateway);
//# sourceMappingURL=gateway.js.map