
const { google } = require('googleapis');
const OAuth2Data = require('./private/google_key.json');

const defaultScope = [
  'https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email'
];

const CLIENT_ID = OAuth2Data.web.client_id;
const CLIENT_SECRET = OAuth2Data.web.client_secret;
const REDIRECT_URL = OAuth2Data.web.redirect_uris;


/**
 * Create the google auth object which gives us access to talk to google's apis.
 */

const createConnection = function() {
  return new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);
};

const getConnectionUrl = function(auth) {
  return auth.generateAuthUrl({
    access_type: 'offline',
    prompt: 'consent',
    scope:  defaultScope
  });
};

const getGooglePlusApi = function(auth) {
  return google.people({ version: 'v1', auth });
};

/**********/
/** MAIN **/
/**********/

/**
 * Part 1: Create a Google URL and send to the client to log in the user.
 */
module.export.urlGoogle = function(){
  const auth = createConnection();
  const url = getConnectionUrl(auth);
  
  return url;
};

async function verify(tk) {
  const auth = createConnection();
  const ticket = await auth.verifyIdToken({
      idToken: tk.id_token,
      audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
      // Or, if multiple clients access the backend:
      //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
  });
  
  const payload = ticket.getPayload();
  
  const userid = payload['sub'];
  // If request specified a G Suite domain:
  //const domain = payload['hd'];
  return payload;
};


module.export = async function getGoogleAccountFromCode(code) {
  const auth = createConnection();
 const data = await auth.getToken(code);
 const tokens = data.tokens;
 auth.setCredentials(tokens);
 const plus = getGooglePlusApi(auth);
 const me = await plus.people.get({resourceName: "people/me", personFields: "names,emailAddresses"});
 var info = await verify(tokens);
 
 return {
   me: info,
   tokens: tokens,
 };
};

