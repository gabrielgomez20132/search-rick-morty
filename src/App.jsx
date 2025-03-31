import React, { use, useState } from 'react';
import Header from './components/Header';
import WatchListModal from './components/WatchListModal';
import CharacterList from './components/CharacterList';
import { CharacterProvider } from './context/CharacterContext';

function App() {

 const [isModalOpen, setIsModalOpen] = useState(false)
 
 const [watchlist, setWatchlist] = useState([])

  return (
    <CharacterProvider>
      <div className="flex flex-col min-h-screen">
        <Header setIsModalOpen={setIsModalOpen}/>
        <WatchListModal 
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          
          watchlist={watchlist}
          setWatchlist={setWatchlist}
        
        />
        <CharacterList 
        watchlist={watchlist}
        setWatchlist={setWatchlist}
        />
        
        
      </div>
  </CharacterProvider>
  );
}

export default App;
