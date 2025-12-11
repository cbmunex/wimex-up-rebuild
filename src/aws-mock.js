// src/aws-mock.js
// Configuração falsa para ambiente hospedado (AWS Amplify) sem Cognito real

const awsMock = {
  aws_project_region: "",
  aws_cognito_region: "",
  aws_user_pools_id: "",
  aws_user_pools_web_client_id: "",
  oauth: {},
};

export default awsMock;

