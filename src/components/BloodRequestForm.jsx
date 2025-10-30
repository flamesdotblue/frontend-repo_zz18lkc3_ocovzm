import React, { useState } from 'react'

const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-']

export default function BloodRequestForm() {
  const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [form, setForm] = useState({
    required_blood_group: 'A+',
    required_units: 1,
    hospital_name: '',
    contact_name: '',
    contact_phone: '',
    city: '',
    latitude: '',
    longitude: '',
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
        required_units: Number(form.required_units),
        latitude: form.latitude ? Number(form.latitude) : undefined,
        longitude: form.longitude ? Number(form.longitude) : undefined,
      }
      const res = await fetch(`${API_BASE}/api/requests`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error('Failed to submit request')
      setMessage({ type: 'success', text: 'Request submitted. We will help you find matching donors.' })
      setForm({ required_blood_group: 'A+', required_units: 1, hospital_name: '', contact_name: '', contact_phone: '', city: '', latitude: '', longitude: '' })
    } catch (err) {
      setMessage({ type: 'error', text: err.message || 'Something went wrong' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-900 mb-1">Request Blood</h2>
      <p className="text-sm text-gray-600 mb-6">Submit an emergency request and we will surface donors in your city.</p>

      {message && (
        <div className={`mb-4 rounded-md px-4 py-2 text-sm ${message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Required Blood Group</label>
          <select name="required_blood_group" value={form.required_blood_group} onChange={handleChange} className="mt-1 w-full rounded-md border-gray-300 focus:ring-red-500 focus:border-red-500">
            {bloodGroups.map((bg) => (
              <option key={bg} value={bg}>{bg}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Required Units (pints)</label>
          <input required type="number" min={1} max={20} name="required_units" value={form.required_units} onChange={handleChange} className="mt-1 w-full rounded-md border-gray-300 focus:ring-red-500 focus:border-red-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Hospital Name</label>
          <input required name="hospital_name" value={form.hospital_name} onChange={handleChange} className="mt-1 w-full rounded-md border-gray-300 focus:ring-red-500 focus:border-red-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Contact Person Name</label>
          <input required name="contact_name" value={form.contact_name} onChange={handleChange} className="mt-1 w-full rounded-md border-gray-300 focus:ring-red-500 focus:border-red-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Contact Phone Number</label>
          <input required name="contact_phone" value={form.contact_phone} onChange={handleChange} className="mt-1 w-full rounded-md border-gray-300 focus:ring-red-500 focus:border-red-500" />
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
            <label className="block text-sm text-gray-700 font-medium">Longitude (optional)</label>
            <input type="number" step="any" name="longitude" value={form.longitude} onChange={handleChange} className="mt-1 w-full rounded-md border-gray-300 focus:ring-red-500 focus:border-red-500" />
          </div>
        </div>
        <div className="md:col-span-2">
          <button disabled={loading} type="submit" className="inline-flex items-center justify-center rounded-md bg-red-600 text-white px-4 py-2 hover:bg-red-700 disabled:opacity-50">
            {loading ? 'Submitting...' : 'Submit Request'}
          </button>
        </div>
      </form>
    </div>
  )
}
