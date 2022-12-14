#!/bin/bash
REPOSITORY=/home/ubuntu/CD/


cd $REPOSITORY

sudo npm install

sudo pm2 start ./build/server.js