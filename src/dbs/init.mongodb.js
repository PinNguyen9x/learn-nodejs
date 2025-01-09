"use strict";
const mongoose = require("mongoose");
const {
  db: { host, port, name },
} = require("../configs/config.mongodb");
const { countConnect } = require("../helpers/check.connectdb");

const connectionStr = `mongodb://${host}:${port}/${name}`;

class Database {
  constructor() {
    this.connect();
  }

  // connect
  async connect(type = "mongodb") {
    if (1 === 1) {
      mongoose.set("debug", true);
      mongoose.set("debug", { color: true });
    }
    const MAX_RETRIES = 3;
    const RETRY_DELAY = 5000; // 5 seconds
    let retries = 0;
    while (retries < MAX_RETRIES) {
      try {
        await mongoose.connect(connectionStr, {
          maxPoolSize: 50,
          connectTimeoutMS: 5000,
          retryWrites: true,
        });

        console.log(`Connected MongoDB Successfully`);
        countConnect();
        break; // Exit loop on successful connection
      } catch (error) {
        retries++;
        console.error(`Connection attempt ${retries} failed:`, error.message);

        if (retries === MAX_RETRIES) {
          console.error("Failed to connect to MongoDB after maximum retries");
          throw error;
        }

        console.log(`Retrying in ${RETRY_DELAY / 1000} seconds...`);
        await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));
      }
    }
  }

  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }

    return Database.instance;
  }
}

const instanceMongodb = Database.getInstance();
module.exports = instanceMongodb;
