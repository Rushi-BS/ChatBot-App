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
exports.Response = exports.Query = exports.Chat = void 0;
const typeorm_1 = require("typeorm");
const Agent_1 = require("./Agent");
let Chat = class Chat {
};
exports.Chat = Chat;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Chat.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Chat.prototype, "chatName", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Chat.prototype, "startBy", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], Chat.prototype, "isAgentPresent", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], Chat.prototype, "endAt", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], Chat.prototype, "isDeleted", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Chat.prototype, "rating", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Chat.prototype, "feedback", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Query, query => query.chat),
    __metadata("design:type", Array)
], Chat.prototype, "queries", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Response, response => response.chat),
    __metadata("design:type", Array)
], Chat.prototype, "responses", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Agent_1.Agent, agent => agent.chats),
    __metadata("design:type", Agent_1.Agent)
], Chat.prototype, "agent", void 0);
exports.Chat = Chat = __decorate([
    (0, typeorm_1.Entity)()
], Chat);
let Query = class Query {
};
exports.Query = Query;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Query.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Query.prototype, "text", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], Query.prototype, "timestamp", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Chat, chat => chat.queries),
    __metadata("design:type", Chat)
], Query.prototype, "chat", void 0);
exports.Query = Query = __decorate([
    (0, typeorm_1.Entity)()
], Query);
let Response = class Response {
};
exports.Response = Response;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Response.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Response.prototype, "text", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], Response.prototype, "timestamp", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Agent_1.Agent),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Agent_1.Agent)
], Response.prototype, "agent", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', nullable: true }),
    __metadata("design:type", Boolean)
], Response.prototype, "isBotResponse", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Chat, chat => chat.responses),
    __metadata("design:type", Chat)
], Response.prototype, "chat", void 0);
exports.Response = Response = __decorate([
    (0, typeorm_1.Entity)()
], Response);
