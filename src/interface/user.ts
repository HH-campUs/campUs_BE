import { IncomingHttpHeaders } from "http";
import passport = require("passport");


export interface Users  {
  profileImg?: string;
  email?: string;
  nickname?: string;
  password?: string;
  userId?: number;
  refreshToken?:string
}
//상속 받아서 사용 가능
export interface token extends IncomingHttpHeaders {
  refreshtoken?:string
}
//패스포트 타입은 any여서 타입 명시
export interface profile extends passport.Profile {
  _json: {
    id:number
    properties: {
      profile_image: string;
      nickname: number;
    };
  };
}
