#!/bin/bash
REPOSITORY=/home/ubuntu/autocode/


cd $REPOSITORY

sudo npm install

sudo pm2 start server.js