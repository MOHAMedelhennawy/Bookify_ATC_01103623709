import React, { useEffect, useState } from 'react'

import EventCard from './EventCard'
import FilterationBar from './FilterationBar'
import UpcomingEventsHeader from './UpcomingEventsHeader'

import Pagination from '../Common/Pagination'
import { getEvents } from "../../services/Events";

export default function Events() {
  const [ events, setEvents ] = useState({ events: [], count: 0, limit: 10 });
  const [currentPage, setCurrentPage] = useState(1);
  const [ filters, setFilters ] = useState({});
  const [ loading, setLoading ] = useState(false);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
    console.log('Filters changed:', filters);
  }, [filters]);

  // Fetch events when page or filters change
  useEffect(() => {
    setLoading(true);
    getEvents({ page: String(currentPage), ...filters })
      .then(data => {
        setEvents({
          events: data?.events || [],
          count: data?.count || 0,
          limit: data?.limit || 10
        });
      })
      .catch(error => {
        console.error('Error fetching events:', error);
        setEvents({ events: [], count: 0, limit: 10 });
      })
      .finally(() => {
        setLoading(false);
      });
  }, [currentPage, filters]);

  return (
    <div className='bg-[#111827]'>
      <UpcomingEventsHeader />
      <FilterationBar filters={ filters } onFilterChange={ setFilters } />
      <div className="py-5 min-h-screen">
        <div className="max-w-7xl mx-auto px-4">
          {loading ? (
            <div className="flex justify-center items-center py-10">
              <div className="text-white">Loading events...</div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {events.events?.map((event) => (
                <EventCard key={ event.id } event={ event }/>
              ))}
            </div>
          )}
          {!loading && events.events?.length === 0 && (
            <div className="flex justify-center items-center py-10">
              <div className="text-white">No events found.</div>
            </div>
          )}
        </div>
      </div>
      <Pagination numberOfEvents={ events.count } limit={ events.limit } currentPage={ currentPage } setCurrentPage={ setCurrentPage }/>
    </div>
  )
}
