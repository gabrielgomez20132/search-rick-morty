import React, { createContext, useState, useEffect, useMemo } from 'react';

const CharacterContext = createContext();

export const CharacterProvider = ({ children }) => {
  const [characters, setCharacters] = useState([]);
  const [count, setCount] = useState(12); // Número de personajes a mostrar
  const [searchInput, setSearchInput] = useState(""); // Texto ingresado en el input
  const [search, setSearch] = useState(""); // Texto confirmado para la búsqueda
  const [loading, setLoading] = useState(false);

  // Cargar personajes desde la API
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const url = search ? 
          `https://rickandmortyapi.com/api/character?name=${search}` :
          `https://rickandmortyapi.com/api/character`; // Si no hay búsqueda, trae todos

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error('No se pudo obtener los datos de la API');
        }
        
        const data = await response.json();
        setCharacters(data.results || []); // Manejo de resultados vacíos

      } catch (error) {
        console.error('Error fetching data:', error);
        setCharacters([]); // Si hay error, limpiar la lista
      } finally {
        setTimeout(() => setLoading(false), 500); // Spinner por al menos 0.5s
      }
    };

    fetchData();
  }, [search]); // Se ejecuta cada vez que cambia 'search'

  // Memorizar personajes filtrados y limitados
  const filteredCharacters = useMemo(() => {
    return characters.slice(0, count);
  }, [characters, count]);

  
  // Función para manejar la búsqueda
  const handleSearch = () => {
    setSearch(searchInput); // Actualiza el estado de búsqueda
  };

  return (
    <CharacterContext.Provider
      value={{
        characters: filteredCharacters, // Lista de personajes filtrados
        loading,
        count,
        searchInput,
        setSearchInput,
        handleSearch,
        setCount
      }}
    >
      {children}
    </CharacterContext.Provider>
  );
};

export { CharacterContext };
