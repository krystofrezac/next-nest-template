import routes from './routes';

const appConfig = {
  appName: 'Template',
  api: {
    clientUrl: 'http://localhost:4000/graphql',
    serverUrl: 'http://localhost:4000/graphql',
  },
  cookies: {
    token: 'templateToken',
  },
  routes,
};

export default appConfig;
