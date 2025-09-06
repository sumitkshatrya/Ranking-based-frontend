import { useState } from "react"

const Leaderboard = ({ users }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  // Sort users by points descending
  const sortedUsers = [...users].sort((a, b) => b.points - a.points)

  // Pagination logic
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentUsers = sortedUsers.slice(startIndex, endIndex)

  const totalPages = Math.ceil(sortedUsers.length / itemsPerPage)

  return (
    <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-bold text-purple-800 mb-4 pb-2 border-b border-gray-200">
        Leaderboard
      </h2>

      <div className="space-y-3">
        {currentUsers.map((user, index) => (
          <div
            key={user._id}
            className="flex items-center p-3 bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
          >
            <div
              className={`flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full mr-4 font-bold
                ${startIndex + index === 0 ? 'bg-yellow-100 text-yellow-600' :
                  startIndex + index === 1 ? 'bg-gray-100 text-gray-600' :
                  startIndex + index === 2 ? 'bg-amber-100 text-amber-600' :
                  'bg-purple-100 text-purple-600'}`}
            >
              {startIndex + index + 1}
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-gray-900 truncate">{user.name}</h3>
            </div>

            <div className="ml-4 flex-shrink-0">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                {user.points} pts
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-3 mt-4">
          <button
            className="px-4 py-2 rounded-lg font-medium bg-purple-100 text-purple-700 hover:bg-purple-200 disabled:opacity-50 disabled:hover:bg-purple-100 transition"
            onClick={() => setCurrentPage((prev) => prev - 1)}
            disabled={currentPage === 1}
          >
            Prev
          </button>

          <span className="text-sm font-semibold text-gray-700">
            Page <span className="text-purple-700">{currentPage}</span> of {totalPages}
          </span>

          <button
            className="px-4 py-2 rounded-lg font-medium bg-purple-100 text-purple-700 hover:bg-purple-200 disabled:opacity-50 disabled:hover:bg-purple-100 transition"
            onClick={() => setCurrentPage((prev) => prev + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  )
}

export default Leaderboard
