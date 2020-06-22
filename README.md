# serverless-blog-app

Serverless app to create  blog entries with text and pictures with authorized login.
Consists of a serverless backend and a frontend relying on react, distributed both in respective backend and client folders

## Backend

Can be deployed via the serverless framework, only the bucketname must be changed beforehand as well as the endpoint on the authorization server for JWKS.
Both settings can be found within provider.environment in the file backend/serverless.yml

## Front End

Can be run via npm run start and needs to be configured in the file client/src/config.js for the apiId and Authorizationserver.

## Misc

Postman collection present for manual testing as well as automated testing.
