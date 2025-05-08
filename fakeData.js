import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const NUM_USERS = 10;
const NUM_EVENTS = 20;
const NUM_BOOKINGS = 30;

const categories = ["Tech", "Music", "Health", "Education", "Sports"];
const statuses = ["CONFIRMED", "CANCELLED"];

const generateFakeData = async () => {
  try {
	const users = [];
	for (let i = 0; i < NUM_USERS; i++) {
	  const hashedPassword = await bcrypt.hash("password123", 10);
	  const user = await prisma.user.create({
		data: {
		  name: faker.person.fullName(),
		  email: faker.internet.email().toLowerCase(),
		  password: hashedPassword,
		  role: faker.helpers.arrayElement(["ADMIN", "USER"]),
		  createdAt: faker.date.past(),
		},
	  });
	  users.push(user);
	}

	const events = [];
	for (let i = 0; i < NUM_EVENTS; i++) {
	  const event = await prisma.event.create({
		data: {
		  title: faker.lorem.words(3),
		  description: faker.lorem.paragraph(),
		  category: faker.helpers.arrayElement(categories),
		  date: faker.date.future(),
		  venue: faker.location.city(),
		  price: parseFloat(faker.commerce.price({ min: 0, max: 200 })),
		  imageUrl: faker.image.url(),
		  createdById: faker.helpers.arrayElement(users).id,
		  createdAt: faker.date.past(),
		},
	  });
	  events.push(event);
	}

	for (let i = 0; i < NUM_BOOKINGS; i++) {
	  await prisma.booking.create({
		data: {
		  userId: faker.helpers.arrayElement(users).id,
		  eventId: faker.helpers.arrayElement(events).id,
		  bookingDate: faker.date.recent(),
		  status: faker.helpers.arrayElement(statuses),
		},
	  });
	}

	console.log("✅ Fake data inserted into database.");
  } catch (error) {
	console.error("❌ Error inserting data:", error);
  } finally {
	await prisma.$disconnect();
  }
};

generateFakeData();
