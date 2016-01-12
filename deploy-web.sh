#!/usr/bin/env bash
aws s3 cp website/ s3://www.rickroulette.com/ --recursive --region=us-west-1 --exclude=rickroll.mp4
