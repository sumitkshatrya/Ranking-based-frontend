import { useState, useEffect } from 'react'
import UserSection from './components/UserSection'
import Leaderboard from './components/Leaderboard'
import HistorySection from './components/HistorySection'
import { userAPI, pointsAPI, historyAPI } from './services/api'

function App() {
  const [users, setUsers] = useState([])
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setError(null)
      const [usersData, historyData] = await Promise.all([
        userAPI.getUsers(1, 100),
        historyAPI.getHistory(1, 100)
      ])
      
      // Make sure we have data arrays
      setUsers(usersData.data || [])
      
      const formattedHistory = (historyData.data || []).map(h => ({
        ...h,
        date: new Date(h.createdAt).toLocaleString()
      }))
      setHistory(formattedHistory)
    } catch (error) {
      console.error('Error fetching data:', error)
      setError('Failed to load data. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  const handleClaimPoints = async (userId) => {
    try {
      const result = await pointsAPI.claimPoints(userId)
      const pointsAwarded = result.pointsAwarded || 0

      // Update user points
      setUsers(prev =>
        prev.map(user =>
          user._id === userId ? { ...user, points: result.user.points } : user
        )
      )

      // Add to history
      const now = new Date()
      const user = users.find(u => u._id === userId)
      
      if (user) {
        setHistory(prev => [
          { 
            userName: user.name, 
            points: pointsAwarded, 
            date: now.toLocaleString(),
            createdAt: now 
          },
          ...prev
        ])

        return { userName: user.name, points: pointsAwarded, success: true }
      } else {
        return { success: false, message: 'User not found' }
      }
    } catch (error) {
      console.error('Failed to claim points:', error)
      return { success: false, message: error.message }
    }
  }

  const handleAddUser = async (userName) => {
    try {
      const newUser = await userAPI.addUser(userName)
      setUsers(prev => [...prev, { ...newUser, points: 0 }])
      return newUser._id
    } catch (error) {
      console.error('Error adding user:', error)
      alert(`Failed to add user: ${error.message}`)
      return null
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 to-blue-800 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 to-blue-800 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-lg p-6 max-w-md text-center">
          <h2 className="text-xl font-bold text-red-600 mb-4">Error</h2>
          <p className="text-gray-700 mb-4">{error}</p>
          <button 
            onClick={fetchData}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-blue-800 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <UserSection
            users={users}
            onClaimPoints={handleClaimPoints}
            onAddUser={handleAddUser}
          />
          <Leaderboard users={users} />
        </div>
        <HistorySection history={history} />
      </div>
    </div>
  )
}

export default App