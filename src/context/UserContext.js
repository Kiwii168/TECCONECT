// src/context/UserContext.js

import React, { createContext, useContext, useState } from "react";

// Crear el contexto
export const UserContext = createContext();

// Crear el proveedor
export const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState(null); // Estado para guardar el ID del usuario

  return (
    <UserContext.Provider value={{ userId, setUserId }}>
      {children}
    </UserContext.Provider>
  );
};

// Crear el hook useUser para acceder al contexto
export const useUser = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }

  return context;
};
