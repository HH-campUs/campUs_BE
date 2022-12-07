import { IncomingHttpHeaders } from "http";


export interface Users  {
  profileImg?: string;
  newPassword?:string;
  changePassword?:string;
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

export interface coordinate {
  campX?:number
  campY?:number
}