import { weathers } from '../../interface/weather';
import weatherRepo from './weatherRepo';


export default {
  getweather: async ({ pardo, dt }: weathers) => {
    const findDate = await weatherRepo.findDate({dt})
    if(!findDate) throw new Error('요청 하신 날짜가 없습니다.')
    const findWeather = await weatherRepo.getweather({pardo});
    //날씨 가공 함수
    /* 
    토요일인데 평일을 찍었을때 다음주 토요일을 보여줘야함if(토 == )
    토요일이 아니고 평일을 찍었을때 그 주 토요일이 보여줘야함
    */
    const startDate = new Date()
    const day = startDate.getDay()
    //토요일인지?
    if(day === 6){
    const weather = findWeather.map((data) => {
      //날씨가 내가 찍은 날씨와 같은지?
    if (dt === data.dt) {
       return fomatReturnData(data);
       //요일이 토요일이며 내가 찍은 날짜 보다 높은지?
       } else if (data.date === '토' && data.dt > dt!) {
        console.log(String(parseInt(dt!)+7))
        console.log(data.dt)
         return fomatReturnData(data);
       }
      });
      return weather.filter((element) => element !== undefined && element !== null)
      } else {
        //토요일이 아니면 날짜가 같은거와 토요일꺼만 보내줌
      const weather = findWeather.map((data) => {
      if (dt === data.dt) {
          return fomatReturnData(data);
          } else if (data.date === '토') {
            return fomatReturnData(data);
          }
        });
      return weather.filter((element) => element !== undefined && element !== null);
      }
  },
  //저장된 토요일 날씨 찾기
  getReCommend: async () => {
    const findWeather = await weatherRepo.getReCommend();
    //날짜 로직
    const startDate = new Date()
    const useYear = startDate.getFullYear().toString();
    const useMonth = ["0" + (startDate.getMonth() + 1)].toString().slice(-2);
    const useDate = ["0" + startDate.getDate()].toString().slice(-2);
    const useFullDate = useYear + useMonth + useDate;
     //월~토+일 17시 이전(그주 토요일 정보)
  let day = startDate.getDay()
  // 0(일)~ 6(토요일)
  day = 5
  console.log(day)
  let time = parseInt(startDate.toTimeString().slice(0,2))
  time = 18
  //토요일이며 17이후
  if(day === 6 && time >= 17){
    console.log("토요일 17시 이후")
    //토 17시~0시까지 실행(담주 토요일 정보)
    const NextSatweather = findWeather.map((data) => {
      //토요일 17이후 다음주 토요일 날씨 리스트 보내줌
      if (data.date === '토' && parseInt(data.dt) === parseInt(useFullDate)+7) {
        return fomatReturnData(data)
      }
    })
    const NextSatweathers = NextSatweather.filter((element) => element !== undefined && element !== null);
    return NextSatweathers.sort((a,b)=> b!.day! - a!.day!);
  } else {
  console.log("평일 or 토요일 17시 이전")
  const Satweather = findWeather.map((data) => {
      if (data.date === '토' && parseInt(data.dt) === parseInt(useFullDate)) {
        return fomatReturnData(data); 
      }
    });
  const Satweathers = Satweather.filter((element) => element !== undefined && element !== null); 
  return Satweathers.sort((a,b)=> b!.day! - a!.day!)
  }

      /* 이번주 가장 날씨 좋은 곳 토요일 기준으로 다 보냄 
      오늘이 221202면 그주 모든 지역의 토요일 날씨를 보여줌 ㅇㅇ. 
      풍속이 낮고 기온이 높은거 
      17시 기준으로 다음주 토요일*/
      
// return NextSatweathers.sort((a,b)=> b!.day! - a!.day!)
  },
};
//날씨 가공함수
const fomatReturnData = (data: weathers) => {
  return  {
    dt: data.dt,
    pardo: data.pardo,
    date: data.date,
    sunrise: data.sunrise,
    sunset: data.sunset,
    humidity: data.humidity,
    wind_speed: data.wind_speed,
    clouds: data.clouds,
    uvi: data.uvi,
    pop: data.pop,
    day: data.day,
    min: data.min,
    max: data.max,
    night: data.night,
    eve: data.eve,
    morn: data.morn,
    rain: data.rain,
    snow: data.snow,
  }
};