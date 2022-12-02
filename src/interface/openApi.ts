

export interface Camps {
  body: JSON;
  facltNm: string;
  induty: string;
  doNm: string;
  sigunguNm: string;
  addr1: string;
  mapX: string;
  mapY: string;
  operPdCl: string;
  operDeCl: string;
  animalCmgCl: string;
  firstImageUrl: string;
  homepage: string;
  sbrsCl: string;
  posblFcltyCl: string;
  wtrplCo: string;
  swrmCo: string;
  toiletCo: string;
  manageSttus: string;
  themaEnvrnCl: string;
  createdtime: string;
  eqpmnLendCl: string;
  featureNm :string;
  clturEvent:string;
}

export interface Date {
  date: Date;
  year: number;
  month: string;
  day: string;
  hour: string;
  minute: string;
  second: string;
}

export interface Weathers {
  pardo: string;
  dt: Date;
  sunrise: Date;
  sunset: Date;
  humidity: number;
  wind_speed: number;
  clouds: number;
  uvi: number;
  pop: number;
  rain: number;
  snow: number;
  temp: {
    day: number;
    min: number;
    max: number;
    night: number;
    eve: number;
    morn: number;
  };
}
