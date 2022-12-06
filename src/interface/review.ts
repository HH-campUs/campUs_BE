export interface review {
  reviewId?: number;
  campId?: number;
  userId?: number;
  reviewImg?: string;
  reviewComment?: string;
  keyword?: string;
  likeStatus?:number
  a?:number
  b?:number
  createdAt?:number
  Sort?:string
}

export interface search {
  campName?:string
  induty?:string
  doNm?: string;
  sigunguNm?:string
  address?:string
  operPdCl?:string
  operDeCl?:string
  animal?:string
  sbrsCl?:string
  posblFcltyCl?:string
  manageSttus?:string
  themaEnvrnCl?:string
  eqpmnLendCl?:string
  featureNm?:string
  clturEvent?:string
  numOfRows?: number;
  pageNo?: number;
  keyword?: number;
  sort?:string;
}