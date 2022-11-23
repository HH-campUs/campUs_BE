//S3Client 사용
import { S3Client } from '@aws-sdk/client-s3'
import multer from 'multer'
import multerS3 from 'multer-s3'
import dotenv from 'dotenv'
import path from 'path'
import AWS from 'aws-sdk'

dotenv.config()
const upload =  multer({
  storage : multerS3({
    s3: new S3Client({
      credentials:{
        accessKeyId: process.env.S3_ACCESS_KEY!, //방급받은 ACCESSKEY
        secretAccessKey: process.env.S3_SECRET_KEY!//방급받은 SECRETKEY
      },
      region:  process.env.S3_KEY_REGION!, //지역
    }),
    bucket: process.env.S3_bUCKET!, //버켓이름
    acl: "public-read", //권한
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key(req, file, cb) {
      cb(null, `user/${Date.now()}_${path.basename(file.originalname)}`) // original 폴더안에다 파일을 저장
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
})

const deleteFile = (fileDir:string, fileName:string) => {
  try {
    const s3 = new AWS.S3({
      accessKeyId: process.env.S3_ACCESS_KEY!, //방급받은 ACCESSKEY
      secretAccessKey: process.env.S3_SECRET_KEY!//방급받은 SECRETKEY
      })
      const params = {
        Bucket: process.env.S3_bUCKET!,
        Key: fileDir.concat('/', fileName)
      };
        s3.deleteObject(params, function (error , data) {
          if (error) {
            console.log('err: ', error, error.stack);
          } else {
            console.log("정상 삭제 되었습니다.");
          }    
        })        
      } catch(err) {
        console.log(err);
        throw err;
      }
	}


export default {upload ,deleteFile}
