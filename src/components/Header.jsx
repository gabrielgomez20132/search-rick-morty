// src/components/NavBar.jsx
import React from 'react';

const Header = ( { setIsModalOpen } ) => {
  const onOpenModal = () => {
    setIsModalOpen(true)
  }
  
  
  return (
    <>

      <header className="bg-black py-4 px-6 flex items-center justify-center">
        <div className="w-full max-w-6xl flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="font-['Orbitron'] text-2xl font-bold text-[rgb(78,205,196)]">
              NODO Character 
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <button className="bg-blue-500 text-white p-2" onClick={onOpenModal}>
              Ver Favoritos
            </button>
            <i className="ph ph-user-circle text-4xl text-accent-teal hover:text-button-primary-hover cursor-pointer transition-colors duration-300"></i>
          </div>
        </div>
      </header> 

   
      
    </>
    
  );
}

export default Header;
