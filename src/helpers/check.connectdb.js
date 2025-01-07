const mongoose = require("mongoose");
const numCores = require("os").cpus().length;

const countConnect = () => {
  const numConnection = mongoose.connections.length;
  console.log(`Number of connections:: ${numConnection}`);
};

const checkOverload = () => {
  setInterval(() => {
    const numConnection = mongoose.connections.length;
    const memoryUsage = process.memoryUsage().heapUsed / 1024 / 1024;

    console.log(`Active connections:: ${numConnection}`);
    console.log(`Memory usage:: ${memoryUsage} MB`);

    // Example threshold: 5 connections per core
    if (numConnection > numCores * 5) {
      console.warn("Connection overload detected!");
    }
  }, 5000); // Monitor every 5 seconds
};

module.exports = {
  countConnect,
  checkOverload,
};
