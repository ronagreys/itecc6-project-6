function PlatformFilter({ platforms, selectedPlatform, setSelectedPlatform, showDropdown, setShowDropdown }) {
    return (
      <div className="relative">
        <button 
          className="bg-white text-black px-4 py-2 rounded-lg flex items-center gap-2"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          {selectedPlatform} ▼
        </button>
        {showDropdown && (
          <div className="absolute top-full mt-1 w-full bg-white text-black rounded-lg shadow-lg z-10">
            {platforms.map(platform => (
              <button
                key={platform}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                onClick={() => {
                  setSelectedPlatform(platform)
                  setShowDropdown(false)
                }}
              >
                {platform}
              </button>
            ))}
          </div>
        )}
      </div>
    )
  }
  
  export default PlatformFilter