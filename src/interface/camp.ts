export interface getCamp {
    userId?: number;
    campId?: number;
    topicId?: number;
    doNm?: string;
    numOfRows?: number;
    start?: number;
    pageNo?: number;
    authorization?: string | undefined;
    sort?: string;
}

export interface trip {
    tripId? : number;
    userId? : number;
    campId? : number;
    address? : string;
    memo? : string;
    date?: number;
}

export interface ip {
    ip?: string;
    campId?: number;
    time?: number;
}

export interface mostCamp {
    lookUp: number;
}

export interface pick {
    userId?: number;
    campId?: number;
}