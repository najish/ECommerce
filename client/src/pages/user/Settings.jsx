import React, { useState } from 'react'

export default function Settings() {
  const [activeTab, setActiveTab] = useState('profile')

  return (
    <div className="settings-container">
      <aside className="settings-sidebar">
        <ul>
          <li onClick={() => setActiveTab('profile')}>Profile</li>
          <li onClick={() => setActiveTab('security')}>Security</li>
          <li onClick={() => setActiveTab('notifications')}>Notifications</li>
          <li onClick={() => setActiveTab('payments')}>Payments</li>
        </ul>
      </aside>

      <main className="settings-content">
        {activeTab === 'profile' && <ProfileSettings />}
        {activeTab === 'security' && <SecuritySettings />}
        {activeTab === 'notifications' && <NotificationSettings />}
        {activeTab === 'payments' && <PaymentSettings />}
      </main>
    </div>
  )
}

function ProfileSettings() {
  return (
    <div>
      <h2>Profile Settings</h2>
      {/* form fields for name, email, etc */}
    </div>
  )
}

function SecuritySettings() {
  return (
    <div>
      <h2>Security Settings</h2>
      {/* password change, 2FA toggle */}
    </div>
  )
}

function NotificationSettings() {
  return (
    <div>
      <h2>Notification Preferences</h2>
      {/* toggles for email, SMS */}
    </div>
  )
}

function PaymentSettings() {
  return (
    <div>
      <h2>Payment Methods</h2>
      {/* saved cards, add payment */}
    </div>
  )
}
