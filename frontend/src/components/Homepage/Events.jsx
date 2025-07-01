import React, { useEffect, useState } from 'react'
import EventCard from './EventCard'
import { getEvents } from "../../services/Events";

export default function Events() {
  const [ events, setEvents ] = useState([]);

  useEffect(() => {
    getEvents()
      .then(data => setEvents(data))
      .catch(error => console.error('Error fetching events:', error));
  }, []);

  return (
    <div className="bg-[#111827] py-5 min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {events?.events?.map((event) => (
            <EventCard key={ event.id } event={ event }/>
          ))}
        </div>
      </div>
    </div>
  )
}
