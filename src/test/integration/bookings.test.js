import {
	getAllUserBookingServices,
	addNewBookingServices,
	deleteBooksingServices,
} from "../../services/bookings.js";

describe("getAllUserBookingServices", () => {
	it("Should return all user bookings");
	it("Should throw an error if userID is missing");
	it("Should return null or undefined if no user found with the given ID");
	it("Should return an empty array if user exists but has no bookings");
	it("Should throw an error if the database query is fails");
});

describe("addNewBookingServices", () => {
	it("Should return the booking that added successfully");
	it("Should throw an error if userID is missing");
	it("Should throw an error if eventID is missing");
	it("Should return null or undefined if no user found with the given ID");
	it("Should return null or undefined if no event found with the given ID");
	it("Should not allow booking the same event twice for the same user");
	it("Should throw an error if the database query is fails");
});
