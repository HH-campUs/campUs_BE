export interface getCamp {
    topicId?: number;
    doNm?: string;
    numOfRows?: number;
    start?: number;
    pageNo: number;
}

export interface trip {
    tripId? : number;
    userId? : number;
    campId? : number;
    address? : string;
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