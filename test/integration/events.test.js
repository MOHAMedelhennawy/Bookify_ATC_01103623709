import {
    getAllEventsServices,
    getEventByIdServices,
    addNewEventServices,
    updateEventByIdServices,
    deleteEventByIdServices,
} from "../../services/events.js";


describe('getAllEventsServices', () => {
    it('Should return empty array if no data exist');
    it('Should return all events');
    it('Should throw an error if database query is fails');
});

describe('getEventByIdServices', () => {
    it('Should return event when given a valid ID');
    it('Should throw an error if ID is missing');
    it('Should return null or undefined if no event is found with the given ID');
    it('Should throw an error if database query is fails');
});

describe('addNewEventServices', () => {
    it('Should return the event that added successfully');
    it('Should throw a validation error if required fields are missing');
    it('Should sanitize or normalize input before saving');
    it('Should throw an error if database query is fails');
});

describe('updateEventByIdServices', () => {
    it('Should return the event that updated successfully');
    it('Should throw an error if ID is missing');
    it('Should return null or undefined if no event is found with the given ID');
    it('Should throw an error if database query is fails');
});

describe('deleteEventByIdServices', () => {
    it('Should return the event that deleted successfully');
    it('Should throw an error if id is missing');
    it('Should return null or undefined if no event is found with the given ID');
    it('Should throw an error if database query is fails');
})