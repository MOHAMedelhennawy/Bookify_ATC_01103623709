// fakeData.js
import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";

const NUM_USERS = 10;
const NUM_EVENTS = 20;
const NUM_BOOKINGS = 30;

const roles = ["admin", "user"];
const categories = ["Tech", "Music", "Health", "Education", "Sports"];
const statuses = ["confirmed", "cancelled"];

const generateFakeData = async () => {
	const users = [];
	const events = [];
	const bookings = [];

	// 🧑‍💻 Create Users
	for (let i = 0; i < NUM_USERS; i++) {
		const hashedPassword = await bcrypt.hash("password123", 10);
		users.push({
			id: i + 1,
			name: faker.person.fullName(),
			email: faker.internet.email().toLowerCase(),
			password: hashedPassword,
			role: faker.helpers.arrayElement(roles),
			created_at: faker.date.past().toISOString(),
		});
	}

	// 🎉 Create Events
	for (let i = 0; i < NUM_EVENTS; i++) {
		const creatorId = faker.number.int({ min: 1, max: NUM_USERS });
		events.push({
			id: i + 1,
			title: faker.lorem.words(3),
			description: faker.lorem.paragraph(),
			category: faker.helpers.arrayElement(categories),
			date: faker.date.future().toISOString(),
			venue: faker.location.city(),
			price: faker.commerce.price({ min: 0, max: 200, dec: 2 }),
			image_url: faker.image.url(),
			created_by: creatorId,
			created_at: faker.date.past().toISOString(),
		});
	}

	// 📅 Create Bookings
	for (let i = 0; i < NUM_BOOKINGS; i++) {
		const userId = faker.number.int({ min: 1, max: NUM_USERS });
		const eventId = faker.number.int({ min: 1, max: NUM_EVENTS });
		bookings.push({
			id: i + 1,
			user_id: userId,
			event_id: eventId,
			booking_date: faker.date.recent().toISOString(),
			status: faker.helpers.arrayElement(statuses),
		});
	}

	console.log("Users:\n", users);
	console.log("Events:\n", events);
	console.log("Bookings:\n", bookings);
};

generateFakeData();
