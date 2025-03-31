import React, { createContext, useState, useEffect, useMemo } from "react";
import { toast } from "react-toastify";

const CharacterContext = createContext();

export const CharacterProvider = ({ children }) => {
  const [characters, setCharacters] = useState([]);
  const [count, setCount] = useState(20);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [isFirstLoad, setIsFirstLoad] = useState(true); // 👈 Nuevo estado para diferenciar la primera carga

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const url = search
          ? `https://rickandmortyapi.com/api/character?name=${search}`
          : `https://rickandmortyapi.com/api/character`;

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("No se pudo obtener los datos de la API");
        }

        const data = await response.json();
        setCharacters(data.results || []);

        // 👇 Muestra el mensaje solo si NO es la primera carga
        if (!isFirstLoad) {
          toast.success("Datos obtenidos correctamente ✅", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "colored",
          });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setCharacters([]);
        toast.error("No se encontraron datos ❌");
      } finally {
        setTimeout(() => setLoading(false), 500);
        setIsFirstLoad(false); // 👈 Cambia el estado para futuras búsquedas
      }
    };

    fetchData();
  }, [search]);

  const filteredCharacters = useMemo(() => {
    return characters.slice(0, count);
  }, [characters, count]);

  const handleSearch = () => {
    setSearch(searchInput);
  };

  return (
    <CharacterContext.Provider
      value={{
        characters: filteredCharacters,
        loading,
        count,
        searchInput,
        setSearchInput,
        handleSearch,
        setCount,
      }}
    >
      {children}
    </CharacterContext.Provider>
  );
};

export { CharacterContext };
