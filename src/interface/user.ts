export interface Users {
  profileImg?: string;
  email?: string;
  nickname?: string;
  password?: string;
  userId?: number;
  [key: string]: any;
}

export interface profile{
    provider:string
    id: number
    username: string
    _json:{
      id:number
      properties:{
        profile_image:string
        id:number
        nickname:number
      }
    }
}