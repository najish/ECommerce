import React from 'react'

export default function Footer() {
  return (
    <footer className="bg-gray-100 border-t border-gray-200 mt-10 py-6">
      <div className="container text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} MyShop. All rights reserved.
      </div>
    </footer>
  )
}
