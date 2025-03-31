import React, { useContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CharacterContext } from '../context/CharacterContext';

function CharacterList({ watchlist, setWatchlist }) {
  const {
    characters,
    loading,
    count,
    searchInput,
    setSearchInput,
    handleSearch, // Función para ejecutar la búsqueda
    setCount
  } = useContext(CharacterContext);

  const addToWatchList = (character) => {
    const exists = watchlist.some((c) => c.id === character.id);
    if (exists) {
      toast.error('¡Este personaje ya está en la Watchlist!');
      return;
    }

    const updatedWatchlist = [...watchlist, character];
    setWatchlist(updatedWatchlist);
    localStorage.setItem('watchlist', JSON.stringify(updatedWatchlist));
  };

  return (
    <div>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />

      <div className="flex justify-center my-4 space-x-4">
        <input
          type="number"
          value={count}
          onChange={(e) => setCount(Math.max(1, Number(e.target.value)))}
          className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Cantidad de personajes"
          min="1"
        />

        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Buscar personaje por nombre"
        />

        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition-all"
        >
          Enviar
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-32">
          <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {characters.map((character) => (
            <div
              key={character.id}
              className="bg-gray-800 rounded-2xl shadow-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-2xl"
            >
              <img
                src={character.image}
                alt={character.name}
                className="w-full h-100 object-cover rounded-lg mb-3"
              />
              <div className="p-4 text-center">
                <h2 className="text-white text-xl font-semibold mb-3">{character.name}</h2>
                <p className="text-gray-300 text-sm">Especie: {character.species}</p>
                <p className="text-gray-300 text-sm">Estado: {character.status}</p>
                <p className="text-gray-300 text-sm">Ubicación: {character.location.name}</p>
                <button
                  className="bg-green-500 text-white font-medium px-5 py-2 rounded-full shadow-md hover:bg-green-600 hover:shadow-lg active:scale-90 active:opacity-80 transition-all duration-150 mt-3"
                  onClick={() => addToWatchList(character)}
                >
                  + Favoritos
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CharacterList;
