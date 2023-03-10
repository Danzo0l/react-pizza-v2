import { Routes, Route } from 'react-router-dom';
import React, { useState, createContext } from 'react';

import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Cart from './pages/Cart';
import Header from './components/Header';

import './scss/app.scss';

export interface contextObject {
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
}

export const SearchContext = createContext<contextObject>({
  searchValue: '',
  setSearchValue: React.useState,
});

function App() {
  const [searchValue, setSearchValue] = useState<string>('');

  return (
    <div className="wrapper">
      <SearchContext.Provider
        value={{ searchValue: searchValue, setSearchValue: setSearchValue }}
      >
        <Header />
        <div className="content">
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cart" element={<Cart />} />
              {/* ... */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </div>
      </SearchContext.Provider>
    </div>
  );
}

export default App;
