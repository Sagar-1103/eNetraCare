import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";

const SessionContext = createContext();

const SessionProvider = props => {
    const [category, setCategory] = useState(null);
    const [entries,setEntries] = useState(null);
    return (
      <SessionContext.Provider
        value={{category,setCategory,entries,setEntries}}>
        {props.children}
      </SessionContext.Provider>
    );
  };

export default SessionProvider;

export const useSession =()=> useContext(SessionContext);