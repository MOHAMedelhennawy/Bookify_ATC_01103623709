/* eslint-disable no-undef */
import logger from "./logger.js";
import nodemailer from "nodemailer";
import { findUserById } from "../services/auth.js";
import { getEventByIdServices } from "../services/events.js";

const transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: process.env.MAILER_USER, // ex: your-email@gmail.com
		pass: process.env.MAILER_PASSWORD,
	},
});

export const sendBookingConfirmation = async (userId, eventId) => {
	try {
		const user = await findUserById(userId);
		const eventDetails = await getEventByIdServices(eventId);

		const info = await transporter.sendMail({
			from: `"Bookify 📚" <${process.env.MAILER_USER}>`,
			to: user.email,
			subject: `You're Booked! - ${eventDetails.title}`,
			text: `Hi ${user.name || "there"}, your booking for "${eventDetails.title}" on ${eventDetails.date} is confirmed.`,
			html: `
                <h2>Hi ${user.name || "there"},</h2>
                <p>Thanks for booking with <strong>Bookify</strong>!</p>
                <p>Your event <strong>${eventDetails.title}</strong> is confirmed.</p>
                <p><strong>Date:</strong> ${eventDetails.date}</p>
                <p>We’re excited to have you with us. 🎉</p>
            `,
		});

		logger.info("Email sent:", info.messageId);
	} catch (err) {
		logger.error("Error sending email:", err);
	}
};
