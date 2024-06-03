module.exports = {
  apps: [
    {
      name: 'eldorado',
      script: './server.js',
      watch: true,
      autorestart: true,
      max_restarts: 10,
      restart_delay: 5000, // Delay between restarts in ms
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
};
