import { useState } from 'react';

function Categories() {
  const categories: Array<string> = [
    'Все',
    'Мясные',
    'Вегетарианская',
    'Гриль',
    'Острые',
    'Закрытые',
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  const onClickCategory = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <div className="categories">
      <ul>
        {categories.map((value, index) => (
          <li
            key={value}
            onClick={() => onClickCategory(index)}
            className={activeIndex === index ? 'active' : ''}
          >
            {value}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;