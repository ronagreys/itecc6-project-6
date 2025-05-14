function GameCard({ game, onDelete, onUpdateStatus, onUpdateRating }) {
  return (
    <div className="bg-zinc-900/50 p-4 rounded relative group">
      <button 
        onClick={() => onDelete(game.id)}
        className="absolute top-2 right-2 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        ✕
      </button>
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-medium">{game.title}</h3>
          <p className="text-gray-400">{game.platform}</p>
          {game.store_url && (
            <a 
              href={game.store_url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-400 text-sm hover:underline"
            >
              Store Page
            </a>
          )}
        </div>
        <div className="text-right">
          <span className={`
            px-3 py-1 rounded-full text-sm
            ${game.play_status === 'Playing' ? 'bg-blue-500' : ''}
            ${game.play_status === 'Completed' ? 'bg-green-600' : ''}
            ${game.play_status === 'Abandoned' ? 'bg-amber-200 text-black' : ''}
            ${game.play_status === 'Unplayed' ? 'bg-zinc-700' : ''}
          `}>
            {game.play_status}
          </span>
          {game.hours_played > 0 && (
            <p className="text-gray-400 mt-1">{game.hours_played} hours</p>
          )}
          <div className="mt-2 text-yellow-400">
            {game.rating > 0 ? '★'.repeat(game.rating) : '☆☆☆☆☆'}
          </div>
        </div>
      </div>
    </div>
  )
}

export default GameCard