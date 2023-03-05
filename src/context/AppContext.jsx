import { createContext, useState } from 'react';
export const AppContext = createContext();;

const AppContextProvider = ({ children }) => {

  const [currentUser, setCurrentUser] = useState(null);

  const [view, setView] = useState(0);

  const [contactSelected, setContactSelected] = useState({});

  return (
    <AppContext.Provider value={{
      currentUser, setCurrentUser,
      view, setView,
      contactSelected, setContactSelected,
    }}>
        { children }
    </AppContext.Provider>
  )
}

export default AppContextProvider;