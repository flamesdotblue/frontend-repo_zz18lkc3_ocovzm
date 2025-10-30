import React from 'react'
import { HeartPulse, Search, UserPlus, AlertCircle } from 'lucide-react'

export default function Header({ activeTab, onChangeTab }) {
  const tabs = [
    { id: 'register', label: 'Register Donor', icon: UserPlus },
    { id: 'request', label: 'Request Blood', icon: AlertCircle },
    { id: 'search', label: 'Find Donors', icon: Search },
  ]

  return (
    <header className="sticky top-0 z-20 bg-white/80 backdrop-blur border-b border-gray-200">
      <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <HeartPulse className="text-red-600" />
          <div className="font-semibold text-gray-900">Blood Donor Nepal</div>
        </div>
        <nav className="flex items-center gap-2">
          {tabs.map((t) => {
            const Icon = t.icon
            const isActive = activeTab === t.id
            return (
              <button
                key={t.id}
                onClick={() => onChangeTab(t.id)}
                className={`inline-flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors ${
                  isActive
                    ? 'bg-red-50 text-red-700 border border-red-200'
                    : 'text-gray-700 hover:bg-gray-100 border border-transparent'
                }`}
              >
                <Icon size={16} />
                {t.label}
              </button>
            )
          })}
        </nav>
      </div>
    </header>
  )
}
