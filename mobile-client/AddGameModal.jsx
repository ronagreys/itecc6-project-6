function AddGameModal({ show, onClose, onAdd, platforms, statuses }) {
    const [newGame, setNewGame] = useState({
      title: '',
      platform: '',
      status: 'Unplayed',
      hours: 0
    })
  
    const handleSubmit = (e) => {
      e.preventDefault()
      if (!newGame.title || !newGame.platform) return
      onAdd(newGame)
      setNewGame({
        title: '',
        platform: '',
        status: 'Unplayed',
        hours: 0
      })
    }
  
    if (!show) return null
  
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
        <div className="bg-zinc-800 p-6 rounded-lg w-full max-w-md">
          <h2 className="text-xl font-bold mb-4">Add New Game</h2>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label className="block mb-1">Title</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 rounded bg-zinc-700"
                  value={newGame.title}
                  onChange={(e) => setNewGame({...newGame, title: e.target.value})}
                  required
                />
              </div>
  
              <div>
                <label className="block mb-1">Platform</label>
                <select
                  className="w-full px-3 py-2 rounded bg-zinc-700"
                  value={newGame.platform}
                  onChange={(e) => setNewGame({...newGame, platform: e.target.value})}
                  required
                >
                  <option value="">Select Platform</option>
                  {platforms.filter(p => p !== 'All Platforms').map(platform => (
                    <option key={platform} value={platform}>{platform}</option>
                  ))}
                </select>
              </div>
  
              <div>
                <label className="block mb-1">Status</label>
                <select
                  className="w-full px-3 py-2 rounded bg-zinc-700"
                  value={newGame.status}
                  onChange={(e) => setNewGame({...newGame, status: e.target.value})}
                >
                  {statuses.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>
  
              <div>
                <label className="block mb-1">Hours Played</label>
                <input
                  type="number"
                  min="0"
                  step="0.1"
                  className="w-full px-3 py-2 rounded bg-zinc-700"
                  value={newGame.hours}
                  onChange={(e) => setNewGame({...newGame, hours: e.target.value})}
                />
              </div>
            </div>
  
            <div className="flex gap-2 mt-6">
              <button
                type="button"
                className="flex-1 px-4 py-2 rounded bg-zinc-600"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2 rounded bg-blue-500"
              >
                Add Game
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }
  
  export default AddGameModal