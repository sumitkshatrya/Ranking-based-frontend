import { useState } from "react"

const HistorySection = ({ history }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentItems = history.slice(startIndex, endIndex)

  const totalPages = Math.ceil(history.length / itemsPerPage)

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-bold text-purple-800 mb-4 pb-2 border-b border-gray-200">
        Points Claim History
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-gray-500 text-sm font-medium border-b">
              <th className="pb-3">User</th>
              <th className="pb-3">Points</th>
              <th className="pb-3 text-right">Date & Time</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {currentItems.map((entry, index) => (
              <tr key={index} className="hover:bg-gray-50 transition-colors">
                <td className="py-3 font-medium text-gray-900">{entry.userName}</td>
                <td className="py-3">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    +{entry.points}
                  </span>
                </td>
                <td className="py-3 text-gray-500 text-right">{entry.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {history.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No points claim history yet
        </div>
      )}

      {/* Highlighted Pagination */}
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

export default HistorySection
