import React, { useEffect } from 'react';

const WatchListModal = ({ isModalOpen, setIsModalOpen, watchlist, setWatchlist }) => {
  if (!isModalOpen) {
    return null;
  }

  const onClose = () => setIsModalOpen(false);

  // Carga la watchlist desde localStorage cuando el modal se abre.
  useEffect(() => {
    const storedWatchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
    setWatchlist(storedWatchlist);
  }, [isModalOpen]);

  const removeFrontWatchList = (id) => {
    const updatedWatchlist = watchlist.filter((movie) => movie.id !== id);
    setWatchlist(updatedWatchlist);
    localStorage.setItem('watchlist', JSON.stringify(updatedWatchlist));
  };

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
      <div className='bg-white rounded-3xl shadow-2xl p-6 w-11/12 max-w-md relative transform transition-all scale-100'>
        <button 
          onClick={onClose} 
          className='absolute top-4 right-4 text-gray-600 hover:text-red-500 text-xl font-bold'>
          ✖
        </button>
        <h2 className='text-xl font-semibold text-gray-800 text-center mb-4'>Watchlist</h2>
        {watchlist.length === 0 ? (
          <p className='text-center text-gray-500'>No hay películas en la lista.</p>
        ) : (
          <div className='space-y-4'>
            {watchlist.map((movie) => (
              <div key={movie.id} className='flex justify-between items-center bg-gray-100 p-3 rounded-lg shadow'>
                <p className='text-gray-800 font-medium'>{movie.name}</p>
                <button 
                  className='bg-red-500 text-white px-3 py-1 rounded-lg shadow hover:bg-red-600 transition-all'
                  onClick={() => removeFrontWatchList(movie.id)}>
                  Remover
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default WatchListModal;
