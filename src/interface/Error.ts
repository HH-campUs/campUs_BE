//에러 타입 추가
export interface Error {
  name: string;
  message: string;
  stack?: string;
  status?: number;
}
//에러 생성자
export interface ErrorConstructor {
  new (message?: string): Error;
}
//시스템 에러
export interface SystemError {
  status: number;
  message: string;
}
