import { createContext, useContext, useEffect } from 'react';
import listData from '/src/Json/lists.json';

const ListContext = createContext();

export const ListProvider = ({ children }) => {
  useEffect(() => {
    if (!listData || listData.length === 0) {
      console.log("데이터가 없습니다.")
    }
  }, [listData]); // listData가 변경될 때마다 이 훅이 다시 실행됩니다.

  return (
    <ListContext.Provider value={listData}>
      {children}
    </ListContext.Provider>
  );
};

export const useList = () => useContext(ListContext);