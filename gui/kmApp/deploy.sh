#/bin/bash
#upload files
aws s3 cp ./dist s3://kmappbc.net --recursive --acl public-read