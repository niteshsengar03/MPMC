'use client'

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Heart, Github } from 'lucide-react'



export default function DataTable() {
  const [data, setData] = useState([])


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/data')
        setData(response.data.data)
        console.log('Data fetched at:', new Date().toLocaleTimeString())
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()

    const intervalId = setInterval(fetchData, 10000)

    return () => clearInterval(intervalId)
  }, [])

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <header className="bg-blue-600 text-white p-4 shadow-md">
        <h1 className="text-2xl font-bold text-center">MPMC Project</h1>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-4 py-2 text-left font-semibold">ID</th>
                  <th className="px-4 py-2 text-left font-semibold">Time</th>
                  <th className="px-4 py-2 text-left font-semibold">Distance</th>
                  <th className="px-4 py-2 text-left font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => (
                  <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-2">{item.id}</td>
                    <td className="px-4 py-2">{item.time}</td>
                    <td className="px-4 py-2">{item.distance}</td>
                    <td className="px-4 py-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        item.status === 'Not Full' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      <footer className="bg-gray-800 text-white p-4 mt-auto">
        <div className="container mx-auto flex justify-center items-center space-x-2">
          <span>Made with</span>
          <Heart className="w-5 h-5 text-red-500" />
          <span>by Harshit, Neharika and Nitesh</span>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="ml-4 hover:text-gray-300 transition-colors">
            <Github className="w-6 h-6" />
          </a>
        </div>
      </footer>
    </div>
  )
}