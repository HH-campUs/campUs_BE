import { it ,describe,expect ,jest} from '@jest/globals'
import UserRopo from '../../../src/api/user/userRepo'
// ALTER TABLE user ADD googleId VARCHAR(50) AFTER kakaoId
const MockFn = ()=>({
  signup: jest.fn(),
  findUser: jest.fn(),
  findByPk: jest.fn(),
  updaterefreshToken: jest.fn(),
  updateUser: jest.fn(),
  nearCamp: jest.fn(),
  getMyPick: jest.fn(),
  getmyPage: jest.fn(),
})
// ALTER TABLE `user` ADD `googleId` VARCHAR(20)

describe("UserRepo Test",()=>{
  const User = {
 email:"d123@gmail.dpm",
 nickname:"닉네임",
 password: "Qwqe1234",
 userId:1,
 refreshToken:"token",
 profileImg:"sdafsdaf.jpg",
 campX:1234,
 campY:1234,
  }
 it("11",async()=>{
const result = MockFn()
 })
})


