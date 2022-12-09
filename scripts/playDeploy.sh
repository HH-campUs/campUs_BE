#!/bin/bash
REPOSITORY=/home/ubuntu/autocode/


cd $REPOSITORY

npm install

sudo pm2 start server.js