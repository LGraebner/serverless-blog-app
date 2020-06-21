const apiId = '6gpbo7h0j3'
export const apiEndpoint = `https://${apiId}.execute-api.eu-central-1.amazonaws.com/dev`

export const authConfig = {

  domain: 'dev-bo9vxw93.eu.auth0.com',            // Auth0 domain
  clientId: 'C7CG0eZcjejUP1W72DnbSSOBgcKb3eAv',          // Auth0 client id
  callbackUrl: 'http://localhost:3000/callback'
}

export default authConfig;