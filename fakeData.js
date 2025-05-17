import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";
import { readdirSync } from "fs";
import path from "path";

const prisma = new PrismaClient();

const NUM_EVENTS = 500;
const categories = ["Tech", "Music", "Health", "Education", "Sports"];


const IMAGES_DIR = path.join(process.cwd(), "public", "images", "events");

const getLocalImages = () => {
	try {
		const imageFiles = readdirSync(IMAGES_DIR).filter((file) => {
			const ext = path.extname(file).toLowerCase();
			return [".jpg", ".jpeg", ".png", ".webp"].includes(ext);
		});

		console.log(imageFiles);
		if (imageFiles.length === 0) {
			throw new Error("No image files found in directory");
		}

		return imageFiles;
	} catch (error) {
		console.error("❌ Error reading image files:", error);
		process.exit(1);
	}
};

const generateFakeData = async () => {
	try {
		const localImages = getLocalImages();
		console.log(`📷 Found ${localImages.length} local images`);

	
		const createdCategories = await Promise.all(
			categories.map(async (name) => {
				return prisma.category.upsert({
					where: { name },
					update: {},
					create: { name },
				});
			}),
		);

	
		await prisma.event.deleteMany();

		const events = [];
		for (let i = 0; i < NUM_EVENTS; i++) {
			const event = await prisma.event.create({
				data: {
					title: faker.lorem.words(3),
					description: faker.lorem.paragraph(),
					category: {
						connect: {
							id: faker.helpers.arrayElement(createdCategories).id,
						},
					},
					date: faker.date.future(),
					address: faker.location.streetAddress(),
					location: faker.location.city(),
					venue: faker.company.name(),
					price: parseFloat(faker.commerce.price({ min: 0, max: 200 })),
					imageUrl: faker.helpers.arrayElement(localImages),
					createdAt: faker.date.past(),
				},
			});
			events.push(event);
		}

		console.log("✅");
		console.log(`📚 ${createdCategories.length} `);
		console.log(`🎉 ${events.length} `);
	} catch (error) {
		console.error("❌", error);
	} finally {
		await prisma.$disconnect();
	}
};

generateFakeData();
