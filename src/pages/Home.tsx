import { useState, useEffect } from 'react';
import Sort from '../components/Sort';
import Categories from '../components/Categories';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import '../scss/app.scss';

interface Pizza {
  id: 4;
  imageUrl: string;
  title: string;
  types: Array<number>;
  sizes: Array<number>;
  price: number;
  category: number;
  rating: number;
}

function Home() {
  const [items, setItems] = useState<Array<Pizza>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch('https://63ceb250d2e8c29a9bdce0e7.mockapi.io/items')
      .then((res) => res.json())
      .then((json) => {
        setTimeout(() => {
          setItems(json);
          setIsLoading(false);
        });
      });
  }, []);

  return (
    <>
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array<undefined>(6)].map((_, index) => <Skeleton key={index} />)
          : items.map((obj) => (
              <PizzaBlock
                key={obj.id}
                title={obj.title}
                price={obj.price}
                imageUrl={obj.imageUrl}
                sizes={obj.sizes}
                types={obj.types}
              />
            ))}
      </div>
    </>
  );
}

export default Home;
