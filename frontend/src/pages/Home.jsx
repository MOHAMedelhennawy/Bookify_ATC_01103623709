import React from 'react'
import Hero from '../components/Homepage/Hero'
import Events from '../components/Homepage/Events'
import FilterationBar from '../components/Homepage/FilterationBar'
import UpcomingEventsHeader from '../components/Homepage/UpcomingEventsHeader'
import Pagination from '../components/Common/Pagination'

export default function Home() {
  return (
    <div>
        <Hero />
        <UpcomingEventsHeader />
        <FilterationBar />
        <Events />
        <Pagination />
    </div>
  )
}
