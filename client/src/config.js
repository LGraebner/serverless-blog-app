const apiId = '6gpbo7h0j3'
const region = 'eu-central-1'
const stage = 'dev'
export const apiEndpoint = `https://${apiId}.execute-api.${region}.amazonaws.com/${stage}`

const imageBucketName = 'sls-blog-laurent-dev'
export const imageBucketUrl = `https://${imageBucketName}.s3.amazonaws.com`

export const authConfig = {

  domain: 'dev-bo9vxw93.eu.auth0.com',            // Auth0 domain
  clientId: '70sSivqCL6yOd6Xn0nfIEw5VVFYJG9Ou',          // Auth0 client id
  callbackUrl: 'http://localhost:3000/callback'
}

export default authConfig;