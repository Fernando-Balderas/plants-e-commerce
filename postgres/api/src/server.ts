import errorHandler from "errorhandler";
// import mongoose from 'mongoose'

import app from "./app";
import { MONGODB_URI } from "./util/secrets";
import logger from "./util/logger";

const mongoUrl = MONGODB_URI;

// import { Sequelize } from "sequelize";
// export const sequelize = new Sequelize(
//   "postgres",
//   "postgres",
//   "mysecretpassword",
//   {
//     dialect: "postgres",
//   }
// );

import { Sequelize } from "sequelize-typescript";
export const sequelize = new Sequelize({
  database: "postgres",
  dialect: "postgres",
  username: "postgres",
  password: "mysecretpassword",
  models: [__dirname + "/models"], // or [Player, Team],
});

try {
  sequelize
    .authenticate()
    .then(() =>
      logger.info("Connection to PostgreSQL has been established successfully.")
    );
} catch (error) {
  console.error("Unable to connect to the database:", error);
  process.exit(1);
}

// sequelize.sync();

(async () => {
  await sequelize.sync({ force: true });
  // Code here
})();

// mongoose
//   .connect(mongoUrl, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useFindAndModify: false,
//     useCreateIndex: true,
//   })
//   .then(() => {
//     logger.info('Connected to MongoDB')
//   })
//   .catch((err: Error) => {
//     console.log(
//       'MongoDB connection error. Please make sure MongoDB is running. ' + err
//     )
//     process.exit(1)
//   })

/**
 * Error Handler. Provides error handing middleware
   only use in development
 */
if (process.env.NODE_ENV === "development") {
  app.use(errorHandler());
}

// Start Express server
app.listen(app.get("port"), () => {
  console.log(
    "  App is running at http://localhost:%d in %s mode",
    app.get("port"),
    app.get("env")
  );
  console.log("  Press CTRL-C to stop\n");
});
