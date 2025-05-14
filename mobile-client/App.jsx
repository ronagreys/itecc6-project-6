import { useState } from 'react'
import GameList from './components/GameList'

function App() {
  const [games, setGames] = useState([
    {
      id: 1,
      title: 'The Legend of Zelda: Breath of Wild',
      platform: 'Switch',
      play_status: 'Unplayed',
      hours_played: 0,
      rating: 0,
      store_url: ''
    },
    {
      id: 2,
      title: 'Elden Ring',
      platform: 'Switch',
      play_status: 'Playing',
      hours_played: 12.5,
      rating: 4,
      store_url: 'https://store.steampowered.com/app/1245620/ELDEN_RING/'
    },
    {
      id: 3,
      title: 'Stardew Valley',
      platform: 'PC',
      play_status: 'Completed',
      hours_played: 85.0,
      rating: 5,
      store_url: 'https://store.steampowered.com/app/413150/Stardew_Valley/'
    },
    {
      id: 4,
      title: 'Hades',
      platform: 'PC',
      play_status: 'Completed',
      hours_played: 45.0,
      rating: 5,
      store_url: 'https://store.steampowered.com/app/1145360/Hades/'
    },
    {
      id: 5,
      title: 'Persona 5',
      platform: 'PlayStation',
      play_status: 'Abandoned',
      hours_played: 30.2,
      rating: 3,
      store_url: ''
    },
  ])

  const [selectedPlatform, setSelectedPlatform] = useState('All Platforms')
  const [showPlatformDropdown, setShowPlatformDropdown] = useState(false)
  const [showAddModal, setShowAddModal] = useState(false)
  const [newGame, setNewGame] = useState({
    title: '',
    platform: '',
    play_status: 'Unplayed',
    hours_played: 0,
    rating: 0,
    store_url: ''
  })

  const platforms = ['All Platforms', 'PC', 'Switch', 'PlayStation']
  const statuses = ['Unplayed', 'Playing', 'Completed', 'Abandoned']

  const handleDeleteGame = (id) => {
    setGames(games.filter(game => game.id !== id))
  }

  const handleUpdateStatus = (id, status) => {
    setGames(games.map(game => 
      game.id === id ? { ...game, play_status: status } : game
    ))
  }

  const handleUpdateRating = (id, rating) => {
    setGames(games.map(game => 
      game.id === id ? { ...game, rating } : game
    ))
  }

  const handleUpdateHours = (id, hours) => {
    setGames(games.map(game => 
      game.id === id ? { ...game, hours_played: Number(hours) } : game
    ))
  }

  const handleAddGame = (e) => {
    e.preventDefault()
    if (!newGame.title || !newGame.platform) return

    setGames([...games, {
      id: games.length + 1,
      ...newGame,
      hours_played: Number(newGame.hours_played)
    }])
    setShowAddModal(false)
    setNewGame({
      title: '',
      platform: '',
      play_status: 'Unplayed',
      hours_played: 0,
      rating: 0,
      store_url: ''
    })
  }

  return (
    <div className="max-w-md mx-auto p-4 min-h-screen bg-black text-white">
      <h1 className="text-4xl font-bold mb-8">VIDEO GAME TRACKER</h1>
      
      <button 
        onClick={() => setShowAddModal(true)}
        className="w-full bg-zinc-800 text-white py-3 rounded-lg mb-4 flex items-center justify-center gap-2 text-xl"
      >
        Add Game
        <span>+</span>
      </button>

      <div className="flex justify-between items-center mb-4">
        <div className="relative">
          <button 
            className="bg-white text-black px-4 py-2 rounded-lg flex items-center gap-2"
            onClick={() => setShowPlatformDropdown(!showPlatformDropdown)}
          >
            {selectedPlatform} ▼
          </button>
          {showPlatformDropdown && (
            <div className="absolute top-full mt-1 w-full bg-white text-black rounded-lg shadow-lg z-10">
              {platforms.map(platform => (
                <button
                  key={platform}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  onClick={() => {
                    setSelectedPlatform(platform)
                    setShowPlatformDropdown(false)
                  }}
                >
                  {platform}
                </button>
              ))}
            </div>
          )}
        </div>
        <button className="bg-gray-200 p-2 rounded-lg">☰</button>
      </div>

      <GameList 
        games={games} 
        selectedPlatform={selectedPlatform}
        onDelete={handleDeleteGame}
        onUpdateStatus={handleUpdateStatus}
        onUpdateRating={handleUpdateRating}
        onUpdateHours={handleUpdateHours}
      />

      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-zinc-800 p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Add New Game</h2>
            <form onSubmit={handleAddGame}>
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
                    value={newGame.play_status}
                    onChange={(e) => setNewGame({...newGame, play_status: e.target.value})}
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
                    value={newGame.hours_played}
                    onChange={(e) => setNewGame({...newGame, hours_played: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block mb-1">Rating</label>
                  <select
                    className="w-full px-3 py-2 rounded bg-zinc-700"
                    value={newGame.rating}
                    onChange={(e) => setNewGame({...newGame, rating: Number(e.target.value)})}
                  >
                    <option value="0">No Rating</option>
                    {[1,2,3,4,5].map(rating => (
                      <option key={rating} value={rating}>{'★'.repeat(rating)}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block mb-1">Store URL</label>
                  <input
                    type="url"
                    className="w-full px-3 py-2 rounded bg-zinc-700"
                    value={newGame.store_url}
                    onChange={(e) => setNewGame({...newGame, store_url: e.target.value})}
                    placeholder="https://store.example.com/game"
                  />
                </div>
              </div>

              <div className="flex gap-2 mt-6">
                <button
                  type="button"
                  className="flex-1 px-4 py-2 rounded bg-zinc-600"
                  onClick={() => setShowAddModal(false)}
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
      )}
    </div>
  )
}

export default App