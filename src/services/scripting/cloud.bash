#! /bin/bash
#example.sh

cr=$(date +%s)
client=%companyName%
echo "$client"

echo '{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::'$client'.thetalent.games/*"
        }
    ]
}' > /home/ubuntu/scripts/bucket_policy.json

aws s3api create-bucket --bucket $client.thetalent.games --region eu-central-1  --create-bucket-configuration LocationConstraint=eu-central-1
aws s3api put-bucket-policy --bucket $client.thetalent.games --policy file:///home/ubuntu/scripts/bucket_policy.json
aws s3 sync s3://acca.thetalent.games/ s3://$client.thetalent.games/
aws s3 website s3://$client.thetalent.games/ --index-document index.html --error-document error.html
echo "bucket name ="
echo $client.thetalent.games

echo '{
        "CallerReference": "'$cr'",
        "Aliases": {
            "Quantity": 1,
            "Items": [
                "'$client'.thetalent.games"
            ]
        },
        "DefaultRootObject": "index.html",
        "Origins": {
            "Quantity": 1,
            "Items": [
                {
                    "Id": "S3-'$client'.thetalent.games",
                    "DomainName": "'$client'.thetalent.games.s3.amazonaws.com",
                    "OriginPath": "",
                    "CustomHeaders": {
                        "Quantity": 0
                    },
                    "S3OriginConfig": {
                        "OriginAccessIdentity": ""
                    },
                    "ConnectionAttempts": 3,
                    "ConnectionTimeout": 10,
                    "OriginShield": {
                        "Enabled": false
                    }
                }
            ]
        },
        "OriginGroups": {
            "Quantity": 0
        },
        "DefaultCacheBehavior": {
            "TargetOriginId": "S3-'$client'.thetalent.games",
            "TrustedSigners": {
                "Enabled": false,
                "Quantity": 0
            },
            "TrustedKeyGroups": {
                "Enabled": false,
                "Quantity": 0
            },
            "ViewerProtocolPolicy": "redirect-to-https",
            "AllowedMethods": {
                "Quantity": 2,
                "Items": [
                    "HEAD",
                    "GET"
                ],
                "CachedMethods": {
                    "Quantity": 2,
                    "Items": [
                        "HEAD",
                        "GET"
                    ]
                }
            },
            "SmoothStreaming": false,
            "Compress": false,
            "LambdaFunctionAssociations": {
                "Quantity": 0
            },
            "FieldLevelEncryptionId": "",
            "ForwardedValues": {
                "QueryString": false,
                "Cookies": {
                    "Forward": "none"
                },
                "Headers": {
                    "Quantity": 0
                },
                "QueryStringCacheKeys": {
                    "Quantity": 0
                }
            },
            "MinTTL": 0,
            "DefaultTTL": 86400,
            "MaxTTL": 31536000
        },
        "CacheBehaviors": {
            "Quantity": 0
        },
        "CustomErrorResponses": {
            "Quantity": 0
        },
        "Comment": "'$client'",
        "Logging": {
            "Enabled": false,
            "IncludeCookies": false,
            "Bucket": "",
            "Prefix": ""
        },
        "PriceClass": "PriceClass_200",
        "Enabled": true,
        "ViewerCertificate": {
            "ACMCertificateArn": "arn:aws:acm:us-east-1:447406151512:certificate/485bc0b4-f17c-4c35-8eef-ebd5f32e618b",
            "SSLSupportMethod": "sni-only",
            "MinimumProtocolVersion": "TLSv1.2_2019",
            "Certificate": "arn:aws:acm:us-east-1:447406151512:certificate/485bc0b4-f17c-4c35-8eef-ebd5f32e618b",
            "CertificateSource": "acm"
        },
        "Restrictions": {
            "GeoRestriction": {
                "RestrictionType": "none",
                "Quantity": 0
            }
        },
        "WebACLId": "arn:aws:wafv2:us-east-1:447406151512:global/webacl/HBlWAF/7d8f2ffe-a915-47c0-9e62-8e1fe7d4c74d",
        "HttpVersion": "http2",
        "IsIPV6Enabled": true
    }' > /home/ubuntu/scripts/$client.thetalent.games_CF.json
	
aws cloudfront create-distribution --distribution-config file:///home/ubuntu/scripts/$client.thetalent.games_CF.json > /home/ubuntu/scripts/output.json

r53=$(jq -r '.Distribution|.DomainName' ///home/ubuntu/scripts/output.json)
echo '{
     "Comment": "Creating Alias resource record sets in Route 53",
     "Changes": [{
                "Action": "CREATE",
                "ResourceRecordSet": {
                            "Name": "'$client'.thetalent.games",
                            "Type": "A",
                            "AliasTarget":{
                                    "HostedZoneId": "Z2FDTNDATAQYW2",
                                    "DNSName": "'$r53'",
                                    "EvaluateTargetHealth": false
                              }}
                          }]
}' > /home/ubuntu/scripts/$client.thetalent.games_R53.json

aws route53 change-resource-record-sets --hosted-zone-id Z1PEAU3NMLUKYD --change-batch file:///home/ubuntu/scripts/$client.thetalent.games_R53.json




