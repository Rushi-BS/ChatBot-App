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
exports.Response = void 0;
const typeorm_1 = require("typeorm");
const Agent_1 = require("./Agent");
const Chat_1 = require("./Chat");
let Response = class Response {
};
exports.Response = Response;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", String)
], Response.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], Response.prototype, "text", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], Response.prototype, "timestamp", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Agent_1.Agent, agent => agent.responses, { nullable: true, cascade: true }),
    (0, typeorm_1.JoinColumn)({ name: 'givenBy' }),
    __metadata("design:type", Agent_1.Agent)
], Response.prototype, "agent", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Chat_1.Chat, chat => chat.responses, { cascade: true }),
    __metadata("design:type", Chat_1.Chat)
], Response.prototype, "chat", void 0);
exports.Response = Response = __decorate([
    (0, typeorm_1.Entity)()
], Response);
