module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', 'a3a35109429c985fe86902a9765fa9fa'),
  },
});
