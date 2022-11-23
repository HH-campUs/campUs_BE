import { IncomingHttpHeaders } from "http";
import passport = require("passport");


export interface Users {
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
export interface profile extends passport.Profile {
  _json: {
    id:number
    properties: {
      profile_image: string;
      nickname: number;
    };
  };
}
