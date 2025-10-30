import React, { useState } from 'react'
import Header from './components/Header'
import DonorRegistrationForm from './components/DonorRegistrationForm'
import BloodRequestForm from './components/BloodRequestForm'
import DonorSearch from './components/DonorSearch'

export default function App() {
  const [activeTab, setActiveTab] = useState('register')

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 via-white to-white text-gray-900">
      <Header activeTab={activeTab} onChangeTab={setActiveTab} />

      <main className="max-w-5xl mx-auto px-4 py-8">
        <section className="mb-8">
          <div className="rounded-2xl bg-red-600 text-white p-6 md:p-8 shadow-md">
            <h1 className="text-2xl md:text-3xl font-bold">Connect Donors with People in Need</h1>
            <p className="mt-2 text-red-100 max-w-2xl">A simple way for donors across Nepal to register and for seekers to request and find matching donors quickly in their city.</p>
          </div>
        </section>

        <div className="grid grid-cols-1 gap-6">
          {activeTab === 'register' && <DonorRegistrationForm />}
          {activeTab === 'request' && <BloodRequestForm />}
          {activeTab === 'search' && <DonorSearch />}
        </div>

        <footer className="mt-10 text-center text-xs text-gray-500">
          Built for Nepal • Please verify any donor information independently during emergencies.
        </footer>
      </main>
    </div>
  )
}
