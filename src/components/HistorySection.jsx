const HistorySection = ({ history }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-bold text-purple-800 mb-4 pb-2 border-b border-gray-200">Points Claim History</h2>
      
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
            {history.map((entry, index) => (
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
    </div>
  )
}

export default HistorySection