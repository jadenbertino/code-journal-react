import { DataContext } from "../context/DataContext";
import { useContext } from "react";

export function useDataContext() {
  const dataContext = useContext(DataContext)

  if (!dataContext) {
    throw new Error('useDataContext must be inside a DataContextProvider')
  }

  return dataContext // see DataContext for what this actually looks like
}