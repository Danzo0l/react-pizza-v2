import React, { useState, useEffect, useContext } from 'react';
import { SearchContext, contextObject } from '../App';
import Sort from '../components/Sort';
import Categories from '../components/Categories';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';
import '../scss/app.scss';

interface Pizza {
  id: number;
  imageUrl: string;
  title: string;
  types: Array<number>;
  sizes: Array<number>;
  price: number;
  category: number;
  rating: number;
}

function Home() {
  const { searchValue } = useContext<contextObject>(SearchContext);

  const [items, setItems] = useState<Array<Pizza>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [categoryId, setCategoryId] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sortType, setSortType] = useState<{
    name: string;
    sortProperty: string;
    param: boolean;
  }>({
    name: 'алфавиту',
    sortProperty: 'title',
    param: false,
  });

  const pizzasFilter: Array<JSX.Element> = items
    .filter((obj) => {
      return obj.title.toUpperCase().includes(searchValue.toUpperCase());
    })
    .map((obj) => (
      <PizzaBlock
        key={obj.id}
        raiting={obj.rating}
        title={obj.title}
        price={obj.price}
        imageUrl={obj.imageUrl}
        sizes={obj.sizes}
        types={obj.types}
      />
    ));

  const skeletons: Array<JSX.Element> = [...new Array<undefined>(6)].map((_, index) => (
    <Skeleton key={index} />
  ));
  useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://63ceb250d2e8c29a9bdce0e7.mockapi.io/items?page=${currentPage}&limit=4&${
        categoryId ? `category=${categoryId}&` : ''
      }sortBy=${sortType.sortProperty}&order=${sortType.param ? 'desc' : 'asc'}${
        searchValue ? `&search=${searchValue}` : ''
      }`
    )
      .then((res) => res.json())
      .then((json) => {
        setTimeout(() => {
          setItems(json);
          setIsLoading(false);
        });
      });
    window.scrollTo(0, 0);
  }, [categoryId, sortType, searchValue, currentPage]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onClickCategory={(id) => setCategoryId(id)} />
        <Sort
          param={sortType.param}
          value={sortType}
          onClickSort={(id) => setSortType(id)}
        />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeletons : pizzasFilter}</div>
      <Pagination onChabgePage={(number) => setCurrentPage(number)} />
    </div>
  );
}

export default Home;
