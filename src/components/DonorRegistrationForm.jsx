import React, { useState } from 'react'

const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-']

export default function DonorRegistrationForm() {
  const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [form, setForm] = useState({
    full_name: '',
    phone: '',
    blood_group: 'A+',
    age: '',
    city: '',
    latitude: '',
    longitude: '',
    password: '',
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)
    try {
      const payload = {
        ...form,
        age: Number(form.age),
        latitude: form.latitude ? Number(form.latitude) : undefined,
        longitude: form.longitude ? Number(form.longitude) : undefined,
      }
      const res = await fetch(`${API_BASE}/api/donors`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error('Failed to register donor')
      setMessage({ type: 'success', text: 'Registration successful! Thank you for joining as a donor.' })
      setForm({ full_name: '', phone: '', blood_group: 'A+', age: '', city: '', latitude: '', longitude: '', password: '' })
    } catch (err) {
      setMessage({ type: 'error', text: err.message || 'Something went wrong' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-900 mb-1">Become a Donor</h2>
      <p className="text-sm text-gray-600 mb-6">Register your details to be discoverable by people in need nearby.</p>

      {message && (
        <div className={`mb-4 rounded-md px-4 py-2 text-sm ${message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Full Name</label>
          <input required name="full_name" value={form.full_name} onChange={handleChange} className="mt-1 w-full rounded-md border-gray-300 focus:ring-red-500 focus:border-red-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Phone Number</label>
          <input required name="phone" value={form.phone} onChange={handleChange} className="mt-1 w-full rounded-md border-gray-300 focus:ring-red-500 focus:border-red-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Blood Group</label>
          <select name="blood_group" value={form.blood_group} onChange={handleChange} className="mt-1 w-full rounded-md border-gray-300 focus:ring-red-500 focus:border-red-500">
            {bloodGroups.map((bg) => (
              <option key={bg} value={bg}>{bg}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Age</label>
          <input required type="number" min={18} max={80} name="age" value={form.age} onChange={handleChange} className="mt-1 w-full rounded-md border-gray-300 focus:ring-red-500 focus:border-red-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">City</label>
          <input required name="city" value={form.city} onChange={handleChange} placeholder="e.g., Kathmandu" className="mt-1 w-full rounded-md border-gray-300 focus:ring-red-500 focus:border-red-500" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Latitude (optional)</label>
            <input type="number" step="any" name="latitude" value={form.latitude} onChange={handleChange} className="mt-1 w-full rounded-md border-gray-300 focus:ring-red-500 focus:border-red-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Longitude (optional)</label>
            <input type="number" step="any" name="longitude" value={form.longitude} onChange={handleChange} className="mt-1 w-full rounded-md border-gray-300 focus:ring-red-500 focus:border-red-500" />
          </div>
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input required type="password" name="password" value={form.password} onChange={handleChange} className="mt-1 w-full rounded-md border-gray-300 focus:ring-red-500 focus:border-red-500" />
        </div>
        <div className="md:col-span-2 flex gap-3">
          <button disabled={loading} type="submit" className="inline-flex items-center justify-center rounded-md bg-red-600 text-white px-4 py-2 hover:bg-red-700 disabled:opacity-50">
            {loading ? 'Submitting...' : 'Register as Donor'}
          </button>
          <div className="text-xs text-gray-500 self-center">By registering, you agree to be contacted by seekers during emergencies.</div>
        </div>
      </form>
    </div>
  )
}
