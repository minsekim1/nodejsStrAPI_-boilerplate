module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', 'ef836bc7bcbaa738c7a6db72baba9bdf'),
  },
});
