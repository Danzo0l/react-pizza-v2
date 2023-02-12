import React, { useState, useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

import { SearchContext, contextObject } from '../App';
import { RootState } from '../redux/store';
import { setCategoryId } from '../redux/slices/filterSlice';
import { stateType } from '../components/Sort';

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
  const dispatch = useDispatch();

  const categoryId = useSelector<RootState, number>(
    (state) => state.filterSlice.categoryId
  );

  const sortType = useSelector<RootState, stateType>((state) => state.filterSlice.sort);

  const { searchValue } = useContext<contextObject>(SearchContext);

  const [items, setItems] = useState<Array<Pizza>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const onChangeCategory = (id: number) => {
    dispatch(setCategoryId(id));
  };

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
    axios
      .get<Array<Pizza>>(
        `https://63ceb250d2e8c29a9bdce0e7.mockapi.io/items?page=${currentPage}&limit=4&${
          categoryId ? `category=${categoryId}&` : ''
        }sortBy=${sortType.sortProperty}&order=${sortType.param ? 'desc' : 'asc'}${
          searchValue ? `&search=${searchValue}` : ''
        }`
      )
      .then((res) => {
        setItems(res.data);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sortType, searchValue, currentPage]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onClickCategory={onChangeCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeletons : pizzasFilter}</div>
      <Pagination onChabgePage={(number) => setCurrentPage(number)} />
    </div>
  );
}

export default Home;
