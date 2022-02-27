module.exports = ({ env }) => ({
  connection: {
    client: "mysql",
    connection: {
      host: env(
        "DATABASE_HOST",
        "ec2-3-35-209-153.ap-northeast-2.compute.amazonaws.com"
      ),
      port: env.int("DATABASE_PORT", 3306),
      database: env("DATABASE_NAME", "dongwon"),
      user: env("DATABASE_USERNAME", "dongwon"),
      password: env("DATABASE_PASSWORD", "dongwonDev2022!"),
      ssl: env.bool("DATABASE_SSL", false),
    },
  },
});
