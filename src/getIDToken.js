
const _pool_id = 'us-east-2_MlnzCFgHk'

const _client_id = '1956req5ro9drdtbf5i6kis4la'

const _cognito_hostname = 'https://secure-login2.eldorado.gg'

const _eldorado_hostname = 'eldorado.gg'
const { Amplify } = require('aws-amplify');
const { signInWithRedirect ,fetchAuthSession} = require('aws-amplify/auth')



const awsConfig = {
  Auth: {
    Cognito: {
      userPoolId: _pool_id,
      userPoolClientId: _client_id,
      loginWith: {
        oauth: {
          domain: _cognito_hostname,
          redirectSignIn: `https://${_eldorado_hostname}/account/auth-callback`,
          responseType: "code",
        },
      },
    },
  },
};
Amplify.configure(awsConfig);
(async () => {
 //Amplify.configure(awsAmplifyConfig);
  // Pass valid username and password
  await signInWithRedirect({
    provider: 'Google',
    options:{
      
    }
  })
  //await signIn({ username: "ranitmsd53@gmail.com", password: "Ranitzigsaw007" })
  await fetchAuthSession().then(session => console.log(`Id token: ${session.tokens.idToken}`));
})();