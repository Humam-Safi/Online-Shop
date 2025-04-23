import { createContext, useState } from "react";

export const SearchCont = createContext()

const SearchContext = ({children}) => {
  const [search, setSearch] = useState("");

  return (
    <SearchCont.Provider value={{ search, setSearch }}>
      {children}
    </SearchCont.Provider>
  );
}
 
export default SearchContext;