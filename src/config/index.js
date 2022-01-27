const {NODE_ENV, REACT_APP_URL} = process.env;
const isProdEnv = NODE_ENV === 'production';

const config = {
  env: NODE_ENV,
  isProdEnv: isProdEnv,
  isDevEnv: !isProdEnv,
  AppBaseURL: REACT_APP_URL
};

export default config;
