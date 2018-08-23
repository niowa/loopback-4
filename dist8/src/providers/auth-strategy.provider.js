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
const context_1 = require("@loopback/context");
const passport_jwt_1 = require("passport-jwt");
const authentication_1 = require("@loopback/authentication");
const passport_jwt_2 = require("passport-jwt");
const opts = {
    jwtFromRequest: passport_jwt_2.ExtractJwt.fromHeader('x-access-token'),
    secretOrKey: 'f4vb8fJu9hE9XfX6szY5awQU',
};
let MyAuthStrategyProvider = class MyAuthStrategyProvider {
    constructor(metadata) {
        this.metadata = metadata;
    }
    value() {
        // The function was not decorated, so we shouldn't attempt authentication
        if (!this.metadata) {
            return undefined;
        }
        const name = this.metadata.strategy;
        console.log(name);
        if (name === 'JwtStrategy') {
            return new passport_jwt_1.Strategy(opts, this.verify);
        }
        else {
            return Promise.reject(`The strategy ${name} is not available.`);
        }
    }
    verify(jwtPayload, cb) {
        console.log(jwtPayload);
        const user = {
            id: "test",
            name: "test",
            email: "val",
        };
        cb(null, user);
        // find user by name & password
        // call cb(null, false) when user not found
        // call cb(null, user) when user is authenticated
    }
};
MyAuthStrategyProvider = __decorate([
    __param(0, context_1.inject(authentication_1.AuthenticationBindings.METADATA)),
    __metadata("design:paramtypes", [Object])
], MyAuthStrategyProvider);
exports.MyAuthStrategyProvider = MyAuthStrategyProvider;
//# sourceMappingURL=auth-strategy.provider.js.map