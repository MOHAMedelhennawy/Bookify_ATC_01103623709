/* eslint-disable no-undef */
import { PrismaClient } from "@prisma/client";
import {
	getAllEventsServices,
	getEventByIdServices,
	addNewEventServices,
	updateEventByIdServices,
	deleteEventByIdServices,
} from "../../services/events.js";

const prisma = new PrismaClient();

let createdEvent = null;

beforeAll(async () => {
	await prisma.$connect();

	// clean db
	await prisma.event.deleteMany();

	// seed
	createdEvent = await prisma.event.create({
		data: {
			title: "Test Event",
			description: "Testing event",
			category: "Tech",
			date: new Date(),
			venue: "Online",
			price: 100,
			imageUrl: "http://example.com",
			createdById: "user-123",
		},
	});
});

afterAll(async () => {
	await prisma.event.deleteMany();
	await prisma.$disconnect();
});

describe("getAllEventsServices", () => {
	it("Should return all events", () => {
		const events = getAllEventsServices();

		expect(events.length).toBe(1);
		expect(Array.isArray(events)).toBe(true);
		expect(typeof events === "object").toBe(true);
		expect(Object.keys(events[0]).length).toBe(11);
		expect(events[0]["id"]).not.toBe(null);
	});
	it("Should return empty array if no data exist");
	it("Should throw an error if database query is fails");
});

describe("getEventByIdServices", () => {
	it("Should return event when given a valid ID");
	it("Should throw an error if ID is missing");
	it("Should return null or undefined if no event is found with the given ID");
	it("Should throw an error if database query is fails");
});

describe("addNewEventServices", () => {
	it("Should return the event that added successfully");
	it("Should throw a validation error if required fields are missing");
	it("Should throw an error if data equal to null");
	it("Should sanitize or normalize input before saving");
	it("Should throw an error if user is not admin");
	it("Should throw an error if database query is fails");
});

describe("updateEventByIdServices", () => {
	it("Should return the event that updated successfully");
	it("Should throw an error if ID is missing");
	it("Should return null or undefined if no event is found with the given ID");
	it("Should throw an error if database query is fails");
});

describe("deleteEventByIdServices", () => {
	it("Should return the event that deleted successfully");
	it("Should throw an error if id is missing");
	it("Should return null or undefined if no event is found with the given ID");
	it("Should throw an error if database query is fails");
});
