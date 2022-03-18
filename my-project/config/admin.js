module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '35076c435c4be3287759364efccd5256'),
  },
});
