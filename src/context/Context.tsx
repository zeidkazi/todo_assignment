import { createContext, ReactNode, useState } from "react";
import { ContextType } from "../types";

export const MyContext = createContext<ContextType>({
  page: 1,
  setPage: () => {},
});

export const ContextProvider = ({ children }: { children: ReactNode }) => {
  const [page, setPage] = useState<number>(1);

  return (
    <MyContext.Provider value={{ page, setPage }}>
      {children}
    </MyContext.Provider>
  );
};
