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
exports.Agent = void 0;
const typeorm_1 = require("typeorm");
const Chat_1 = require("./Chat");
const Response_1 = require("./Response");
let Agent = class Agent {
};
exports.Agent = Agent;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", String)
], Agent.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Agent.prototype, "agentName", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Agent.prototype, "issueAttended", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Agent.prototype, "rating", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Chat_1.Chat, chat => chat.agent),
    __metadata("design:type", Array)
], Agent.prototype, "chats", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Response_1.Response, response => response.agent),
    __metadata("design:type", Array)
], Agent.prototype, "responses", void 0);
exports.Agent = Agent = __decorate([
    (0, typeorm_1.Entity)()
], Agent);
