//S3Client 사용
import { S3Client } from '@aws-sdk/client-s3'
import multer from 'multer'
import multerS3 from 'multer-s3'
import dotenv from 'dotenv'
import path from 'path'
import AWS from 'aws-sdk'
import sharp from 'sharp'

dotenv.config()

export const upload = (
  multer({
    storage : multerS3({
      s3: new S3Client({
        credentials:{
          accessKeyId: process.env.S3_ACCESS_KEY!, //방급받은 ACCESSKEY
          secretAccessKey: process.env.S3_SECRET_KEY!//방급받은 SECRETKEY
        },
        region:process.env.S3_KEY_REGION!,//지역
      }),
      bucket: process.env.S3_bUCKET!, //버켓이름
      acl: "public-read", //권한
      contentType: multerS3.AUTO_CONTENT_TYPE,
      key(req, file, cb) {
        const random = Math.floor(Math.random()*10001)
        if(file.fieldname == 'profileImg'){
          cb(null, `user/${Date.now()}${random}${path.extname(file.originalname)}`) // original 폴더안에다 파일을 저장
        }else{
          cb(null, `review/${Date.now()}${random}${path.extname(file.originalname)}`) // original 폴더안에다 파일을 저장 
        }
      },
    }),
    limits: { fileSize: 5 * 1024 * 1024 },
  })
)
//
export const deleteFile = (fileDir:string, fileName:string) => {
  try {
    const s3 = new AWS.S3({
      accessKeyId: process.env.S3_ACCESS_KEY!, //방급받은 ACCESSKEY
      secretAccessKey: process.env.S3_SECRET_KEY!,//방급받은 SECRETKEY
    })
      const params = {
        Bucket: process.env.S3_bUCKET!,
        Key: fileDir.concat('/', fileName)
      };
        s3.deleteObject(params, function (err) {
          if (err) {
            console.log('err: ', err, err.stack);
          } else {
            console.log(`${fileDir}/${fileName} : 정상 삭제 되었습니다.`);
          }    
        })        
      } catch(err) {
        console.log(err);
        throw err;
      }
	}
  //이미지 리사이징
  export const resizing = async (location:string) => {
    try {
      const s3 = new AWS.S3({
        accessKeyId: process.env.S3_ACCESS_KEY!, //방급받은 ACCESSKEY
        secretAccessKey: process.env.S3_SECRET_KEY!,//방급받은 SECRETKEY
      })
     const key = location.slice(48)
     //원본 파일 버캣과 키값
      const originalFile = {
        Bucket: process.env.S3_bUCKET!,
        Key: key
      }
    //리사이징 파일 버캣과 키값
      const resizedFile:any = {
        Bucket: process.env.S3_bUCKET!,
        Key: key
      }
      // fetch(원본 파일 불러오기)
      const imageData:any = await s3.getObject(originalFile).promise()
      console.log(imageData.Body,"사이즈 변경 전 버퍼")
    // resizing(원본 파일 body의 버퍼값 변경)
      const imageBuffer = await sharp(imageData.Body).resize({ width: 600, height:600 }).toBuffer();
      console.log(imageBuffer,"사이즈 변경 후 버퍼")
      resizedFile.Body = imageBuffer;
      
    // upload
      await s3.putObject(resizedFile).promise();
    } catch(error) {
      console.log('AWS에러: ', error);
    }
  }

