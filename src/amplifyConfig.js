// src/amplifyConfig.js
import { Amplify } from 'aws-amplify';

Amplify.configure({
  Auth: {
    region: "sa-east-1",
    userPoolId: "sa-east-1_xxxxxxxx",
    userPoolWebClientId: "xxxxxxxxxxxxxxxxxxxxxxx",
    identityPoolId: "sa-east-1:xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  }
});
