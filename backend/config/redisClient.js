/* eslint-disable no-undef */
import { createClient } from "redis";
import logger from "./logger.js";

const REDIS_PORT = process.env.REDIS_PORT;
const REDIS_HOST = process.env.REDIS_HOST;
const client = createClient({
	url: `redis://${REDIS_HOST}:${REDIS_PORT}`,
});

client.on("error", (err) => {
	logger.error("Redis client error", err);
});

client.on("connect", () => {
	logger.info("Redis connected successfully");
});

client.connect();

export default client;
