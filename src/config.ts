import "./load-env-vars";

export const config = {
  server: {
    port: process.env.PORT || 3000
  },
  db: {
    mysql: {
      stringConnection: process.env.MYSQL_STRING_CONNECTION || "mysql://root:root@localhost:3306/sequelize"
    }
  }
};
