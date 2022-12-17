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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
//^[a-z0-9]+[\._]?[a-z0-9]+[@]\w+[.]\w+[.]?\w{2,3} ex) youwa65@dddd.dd.fd
//^(?=.*[A-Z].*[a-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$  특수문자 대문자 소문사 숫자 하나이상 필요8-20사이
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
exports.default = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    class userDto {
    }
    __decorate([
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsEmail)(),
        (0, class_validator_1.Matches)(/^[a-z0-9]+[\._]?[a-z0-9]+[@]\w+[.]\w+[.]?\w{2,3}/, {
            message: "이메일 형식이 틀렸습니다."
        }),
        __metadata("design:type", String)
    ], userDto.prototype, "email", void 0);
    __decorate([
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.Matches)(/^(?=.*[A-Z].*[a-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$/, {
            message: "비밀번호 형식이 틀렸습니다."
        }),
        __metadata("design:type", String)
    ], userDto.prototype, "password", void 0);
    __decorate([
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.Matches)(/^(?=.*[A-Z].*[a-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$/, {
            message: "비밀번호 형식이 틀렸습니다."
        }),
        __metadata("design:type", String)
    ], userDto.prototype, "changePassword", void 0);
    /*
       plainToClass <= plain object를 class object로 변환(DTO)
       validateOrReject <= 반환값이 프로미스이며 유효성 검증 실패시 에러발생
       skipMissingProperties <= true일시 누락된건 스킵하고 검사
       DTO <=  로직을 가지지 않는 순수한 데이터 객체
    */
    const target = (0, class_transformer_1.plainToClass)(userDto, req.body);
    try {
        yield (0, class_validator_1.validateOrReject)(target, { skipMissingProperties: true });
        next();
    }
    catch (err) {
        res.status(400).send(err);
        console.log(err);
    }
});
