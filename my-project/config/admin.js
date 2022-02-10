module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '9521d895ffda7354b46c4f411c2b30d0'),
  },
});
