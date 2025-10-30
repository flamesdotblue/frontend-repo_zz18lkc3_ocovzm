import React, { useState } from 'react'

const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-']

export default function DonorSearch() {
  const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [params, setParams] = useState({ blood_group: 'A+', city: '' })
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState([])
  const [error, setError] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setParams((p) => ({ ...p, [name]: value }))
  }

  const search = async (e) => {
    e.preventDefault()
    if (!params.city) {
      setError('Please enter a city')
      return
    }
    setError(null)
    setLoading(true)
    try {
      const url = new URL(`${API_BASE}/api/search/donors`)
      url.searchParams.set('blood_group', params.blood_group)
      url.searchParams.set('city', params.city)
      const res = await fetch(url.toString())
      if (!res.ok) throw new Error('Search failed')
      const data = await res.json()
      setResults(data)
    } catch (err) {
      setError(err.message || 'Something went wrong')
      setResults([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-900 mb-1">Find Matching Donors</h2>
      <p className="text-sm text-gray-600 mb-6">Search our donor pool by blood group and city.</p>

      <form onSubmit={search} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Blood Group</label>
          <select name="blood_group" value={params.blood_group} onChange={handleChange} className="mt-1 w-full rounded-md border-gray-300 focus:ring-red-500 focus:border-red-500">
            {bloodGroups.map((bg) => (
              <option key={bg} value={bg}>{bg}</option>
            ))}
          </select>
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">City</label>
          <input required name="city" value={params.city} onChange={handleChange} placeholder="e.g., Kathmandu" className="mt-1 w-full rounded-md border-gray-300 focus:ring-red-500 focus:border-red-500" />
        </div>
        <div className="md:col-span-3">
          <button disabled={loading} type="submit" className="inline-flex items-center justify-center rounded-md bg-red-600 text-white px-4 py-2 hover:bg-red-700 disabled:opacity-50">
            {loading ? 'Searching...' : 'Search Donors'}
          </button>
        </div>
      </form>

      {error && <div className="mb-4 rounded-md px-4 py-2 text-sm bg-red-50 text-red-700 border border-red-200">{error}</div>}

      <div className="divide-y divide-gray-200 rounded-lg border border-gray-200">
        {results.length === 0 && !loading && (
          <div className="p-6 text-sm text-gray-600">No donors found yet. Try another city or register as a donor.</div>
        )}
        {results.map((d) => (
          <div key={d.id} className="p-4 flex items-center justify-between">
            <div>
              <div className="font-medium text-gray-900">{d.full_name}</div>
              <div className="text-xs text-gray-500">City: {d.city}</div>
            </div>
            <div className="text-right">
              <div className="text-sm font-semibold text-red-700">{d.blood_group}</div>
              <div className="text-sm text-gray-700">{d.phone}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
