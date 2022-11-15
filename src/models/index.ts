// import Camp, { associate as associateCamp } from './camp';
// import Pick, { associate as associatePick } from './pick';
// import Review, { associate as associateReview } from './review';
// import Trip, { associate as associateTrip } from './trip';
// import User, { associate as associateUser } from './user';
// /*
// 순환 참조로 인한 충돌 방지를 위해 나누어둠
//  */
export * from './sequlize';
// const db = {
//   User,
//   Camp,
//   Pick,
//   Trip,
//   Review,
// };
// // 해당 모델에 있는 associate 함수 실행
// export type dbType = typeof db;
// associateCamp(db);
// associateUser(db);
// associatePick(db);
// console.log('지나가유');
// associateTrip(db);
// associateReview(db);
