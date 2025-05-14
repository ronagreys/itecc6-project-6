import GameCard from './GameCard.jsx'

function GameList({ games, selectedPlatform, onDelete }) {
  const filteredGames = selectedPlatform === 'All Platforms' 
    ? games 
    : games.filter(game => game.platform === selectedPlatform)

  return (
    <div className="space-y-[2px]">
      {filteredGames.map(game => (
        <GameCard 
          key={game.id} 
          game={game} 
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}

export default GameList