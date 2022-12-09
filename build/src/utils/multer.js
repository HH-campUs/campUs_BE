"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFile = exports.upload = void 0;
//S3Client 사용
const client_s3_1 = require("@aws-sdk/client-s3");
const multer_1 = __importDefault(require("multer"));
const multer_s3_1 = __importDefault(require("multer-s3"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const aws_sdk_1 = __importDefault(require("aws-sdk"));
dotenv_1.default.config();
exports.upload = ((0, multer_1.default)({
    storage: (0, multer_s3_1.default)({
        s3: new client_s3_1.S3Client({
            credentials: {
                accessKeyId: process.env.S3_ACCESS_KEY,
                secretAccessKey: process.env.S3_SECRET_KEY //방급받은 SECRETKEY
            },
            region: process.env.S3_KEY_REGION, //지역
        }),
        bucket: process.env.S3_bUCKET,
        acl: "public-read",
        contentType: multer_s3_1.default.AUTO_CONTENT_TYPE,
        key(req, file, cb) {
            const random = Math.floor(Math.random() * 10001);
            if (file.fieldname == 'profileImg') {
                cb(null, `user/${Date.now()}${random}${path_1.default.extname(file.originalname)}`); // original 폴더안에다 파일을 저장
            }
            else {
                cb(null, `review/${Date.now()}${random}${path_1.default.extname(file.originalname)}`); // original 폴더안에다 파일을 저장 
            }
        },
    }),
    limits: { fileSize: 5 * 1024 * 1024 },
}));
const deleteFile = (fileDir, fileName) => {
    try {
        const s3 = new aws_sdk_1.default.S3({
            accessKeyId: process.env.S3_ACCESS_KEY,
            secretAccessKey: process.env.S3_SECRET_KEY, //방급받은 SECRETKEY
        });
        const params = {
            Bucket: process.env.S3_bUCKET,
            Key: fileDir.concat('/', fileName)
        };
        s3.deleteObject(params, function (err) {
            if (err) {
                console.log('err: ', err, err.stack);
            }
            else {
                console.log(`${fileDir}/${fileName} : 정상 삭제 되었습니다.`);
            }
        });
    }
    catch (err) {
        console.log(err);
        throw err;
    }
};
exports.deleteFile = deleteFile;