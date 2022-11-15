import Camp, { associate as associateCamp } from './camp';
import Pick, { associate as associatePick } from './pick';
import Review, { associate as associateReview } from './review';
import Trip, { associate as associateTrip } from './trip';
import User, { associate as associateUser } from './user';
/*
순환 참조로 인한 충돌 방지를 위해 나누어둠
 */
export * from './sequlize';
const db = {
  Camp,
  User,
  Trip,
  Review,
  Pick,
};
export type dbType = typeof db;
associateCamp(db);
associateUser(db);
associateTrip(db);
associateReview(db);
associatePick(db);
