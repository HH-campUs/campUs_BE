import { ErrorConstructor } from '../interface/Error';

//오류 선언해준다는 의미
declare let Error: ErrorConstructor;

//잘못된 매개변수 오류
class InvalidParamsError extends Error {
  //에러 메세지와 스테이터스를 생성함 데이터가 잘못 되었을때
  constructor(message: string, status?: number) {
    //생성한 메세지를 상속받아 사용
    super(message); //상속 받은것은 꼭 써야함 .
    this.status = status || 409; //파람스 에러 409
    this.name = 'InvalidParamsError';
    // if (!message) this.message = '요청한 데이터 형식이 올바르지 않습니다.';
  }
}
//유효성 검사 에러
class ValidationErrors extends Error {
  constructor(message: string, status?: number) {
    super(message);
    this.status = status || 412;
    this.name = 'ValidationError';
  }
}
//인증 에러
class Unauthorized extends Error {
  constructor(message: string, status?: number) {
    super(message);
    this.status = status || 401;
    this.name = 'ValidationError';
  }
}

export default { InvalidParamsError, ValidationErrors, Unauthorized };
