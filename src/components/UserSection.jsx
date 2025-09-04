import { useState } from 'react'

const UserSection = ({ users = [], onClaimPoints, onAddUser }) => {
  const [selectedUserId, setSelectedUserId] = useState('')
  const [newUserName, setNewUserName] = useState('')
  const [claimResult, setClaimResult] = useState(null)
  const [isClaiming, setIsClaiming] = useState(false)

  const handleClaimPoints = async () => {
    if (!selectedUserId) {
      alert('Please select a user first')
      return
    }

    setIsClaiming(true)
    const result = await onClaimPoints(selectedUserId)
    setClaimResult(result)
    
    // Clear result after 3 seconds
    setTimeout(() => setClaimResult(null), 3000)
    setIsClaiming(false)
  }

  const handleAddUser = async () => {
    if (!newUserName.trim()) {
      alert('Please enter a user name')
      return
    }

    const newUserId = await onAddUser(newUserName)
    if (newUserId) {
      setSelectedUserId(newUserId) // select the newly added user
      setNewUserName('')
    }
  }

  return (
    <div className="lg:col-span-1 bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-bold text-purple-800 mb-4 pb-2 border-b border-gray-200">User Selection</h2>
      
      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-700 mb-2">Select User:</label>
        <select 
          value={selectedUserId}
          onChange={(e) => setSelectedUserId(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-800"
          disabled={users.length === 0}
        >
          <option value="">-- Select a user --</option>
          {users.map(user => (
            <option key={user._id} value={user._id} className="text-gray-800">
              {user.name} ({user.points} pts)
            </option>
          ))}
        </select>
        {users.length === 0 && (
          <p className="text-sm text-gray-500 mt-1">No users available. Add a user first.</p>
        )}
      </div>
      
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Add New User:</label>
        <div className="flex gap-2">
          <input 
            type="text" 
            placeholder="Enter new user name"
            value={newUserName} 
            onChange={(e) => setNewUserName(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAddUser()}
            className="flex-1 p-3 border border-gray-00 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-800"
          />
          <button 
            onClick={handleAddUser}
            className="bg-gradient-to-r from-teal-500 to-teal-600 text-white px-4 rounded-lg hover:from-teal-600 hover:to-teal-700 transition-colors"
          >
            Add
          </button>
        </div>
      </div>
      
      <button 
        onClick={handleClaimPoints}
        disabled={isClaiming || users.length === 0 || !selectedUserId}
        className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-all
          ${isClaiming || users.length === 0 || !selectedUserId
            ? 'bg-purple-400 cursor-not-allowed' 
            : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700'}`}
      >
        {isClaiming ? (
          <div className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Claiming Points...
          </div>
        ) : 'Claim Points'}
      </button>
      
      {claimResult && (
        <div className={`mt-4 p-3 rounded-lg text-center font-medium ${claimResult.success ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {claimResult.success 
            ? `${claimResult.userName} claimed ${claimResult.points} points!` 
            : claimResult.message}
        </div>
      )}
    </div>
  )
}

export default UserSection