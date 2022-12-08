#!/bin/bash
REPOSITORY=/home/ubuntu/autocode/build


cd $REPOSITORY

npm install

sudo pm2 start server.js --watch