const Leaderboard = ({ users }) => {
  // Sort users by points descending
  const sortedUsers = [...users].sort((a, b) => b.points - a.points);

  return (
    <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-bold text-purple-800 mb-4 pb-2 border-b border-gray-200">
        Leaderboard
      </h2>

      <div className="space-y-3">
        {sortedUsers.map((user, index) => (
          <div
            key={user._id}
            className="flex items-center p-3 bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
          >
            <div
              className={`flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full mr-4 font-bold
                ${index === 0 ? 'bg-yellow-100 text-yellow-600' :
                  index === 1 ? 'bg-gray-100 text-gray-600' :
                  index === 2 ? 'bg-amber-100 text-amber-600' :
                  'bg-purple-100 text-purple-600'}`}
            >
              {index + 1}
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
    </div>
  );
};

export default Leaderboard;