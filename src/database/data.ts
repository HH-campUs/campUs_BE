import axios from 'axios';
import schedule from 'node-schedule';
import dotenv from 'dotenv';
import { Camps, Weathers, Date } from '../interface/openApi';
import { Weather } from './models/weather';
import { Camp } from './models/camp';

dotenv.config();


async function createcamp() {

  axios
    .get(
      `http://apis.data.go.kr/B551011/GoCamping/basedList?numOfRows=3300&pageNo=1&MobileOS=ETC&MobileApp=ZZ&serviceKey=${process.env.GoCamp}&_type=json`
    )
    .then(async (res) => {
      const camp = res.data.response.body.items.item
      const CAMP = camp.filter((item:Camps)=>item.firstImageUrl !== "")
      const camps = CAMP.map((x: Camps) => {
        return {
            campName: x.facltNm,
            induty: x.induty,
            doNm: x.doNm,
            sigunguNm: x.sigunguNm,
            address: x.addr1,
            X: x.mapX,
            Y: x.mapY,
            operPdCl: x.operPdCl,
            operDeCl: x.operDeCl,
            animal: x.animalCmgCl,
            ImageUrl: x.firstImageUrl,
            homePage: x.homepage,
            sbrsCl: x.sbrsCl,
            posblFcltyCl: x.posblFcltyCl,
            wtrplCo: x.wtrplCo,
            swrmCo: x.swrmCo,
            toiletCo: x.toiletCo,
            manageSttus: x.manageSttus,
            themaEnvrnCl: x.themaEnvrnCl,
            createdtime: x.createdtime,
            eqpmnLendCl: x.eqpmnLendCl,
            featureNm : x.featureNm,
            clturEvent: x.clturEvent
        }
      });
      for (let i = 0; i < camps.length; i += 100) {
        await Camp.bulkCreate(camps.slice(i, i + 100));
        console.log(i, i + 100);
      }
    });
}

async function createweather() {

  const pardoXY = [
    [37.5635, 126.98, '서울','서울시'],
    [37.5864, 127.0462, '경기','경기도'],
    [37.8304, 128.3719, '강원','강원도'],
    [33.4856, 126.5003, '제주','제주도'],
    [34.813, 126.465, '전남','전라남도'],
    [35.8172, 127.111, '전북','전라북도'],
    [35.1569, 126.8533, '광주','광주시'],
    [35.2347, 128.6941, '경남','경상남도'],
    [35.8896, 128.6027, '경북','경상북도'],
    [35.5354, 129.3136, '울산','울산시'],
    [35.8685, 128.60356, '대구','대구시'],
    [35.177, 129.0769, '부산','부산시'],
    [36.3238, 127.4229, '충남','충청남도'],
    [36.6325, 127.4935, '충북','충청북도'],
    [36.48, 127.289, '세종','세종시'],
    [36.3471, 127.3865, '대전','대전시'],
    [37.4532, 126.7073, '인천','인천시'],
  ];
  for (const XY of pardoXY) {
    axios
      .get(
        `https://api.openweathermap.org/data/3.0/onecall?lat=${XY[0]}&lon=${XY[1]}&exclude=current,minutely,hourly,alerts&lang=kr&appid=${process.env.Weather_Key}&units=metric`
      )
      .then(async (res) => {
        function Unix_timestamp(t: Date) {
          const date = new Date(+t * 1000);
          const year = date.getFullYear();
          const month = '0' + (date.getMonth() + 1);
          const day = '0' + date.getDate();
          const hour = '0' + date.getHours();
          const minute = '0' + date.getMinutes();
          const second = '0' + date.getSeconds();
          return (
            year +
            '-' +
            month.substr(-2) +
            '-' +
            day.substr(-2) +
            ' ' +
            hour.substr(-2) +
            ':' +
            minute.substr(-2) +
            ':' +
            second.substr(-2)
          );
        }
        const weathers = res.data.daily.map((x: Weathers) => {
          return {
            pardo: XY[2],
            name: XY[3],
            dt: Unix_timestamp(x.dt).slice(0, 10).split('-').join(''),
            date: ['일', '월', '화', '수', '목', '금', '토'][
              new Date(`${Unix_timestamp(x.dt).slice(0, 10)}`).getDay()
            ],
            sunrise: Unix_timestamp(x.sunrise),
            sunset: Unix_timestamp(x.sunset),
            day: x.temp.day,
            min: x.temp.min,
            max: x.temp.max,
            night: x.temp.night,
            eve: x.temp.eve,
            morn: x.temp.morn,
            humidity: x.humidity,
            wind_speed: x.wind_speed,
            clouds: x.clouds,
            uvi: x.uvi,
            pop: x.pop,
            rain: x.rain,
            snow: x.snow,
          };
        })
        await Weather.bulkCreate(weathers);
        // console.log(weathers)
      });
  }
}

function sleep(ms:number) {
  return new Promise((r) => setTimeout(r, ms));
}

const rule = new schedule.RecurrenceRule();
rule.dayOfWeek = [0, new schedule.Range(0, 6)];
rule.hour = 0;    //5시
rule.minute = 0;  //정각
rule.tz = "Asia/Seoul";  //한국시간

export default async () => {
  // createcamp();
  // await sleep(3000);
  // console.log('캠핑 저장완료');
  schedule.scheduleJob(rule , async () => {
  await Weather.destroy({ where: {} });
  createweather();
  await sleep(3000);
  console.log('날씨 저장완료');
  });
}