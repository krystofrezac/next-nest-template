const apiConfig = {
  port: 4000,
  hash: {
    saltRounds: 6,
  },
  jwt: {
    secret: 'secretKey',
    expiresIn: '2h',
  },
};

export default apiConfig;
