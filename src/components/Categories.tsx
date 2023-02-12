import React from 'react';

interface categoriesProps {
  value: number;
  // onClickCategory: React.Dispatch<React.SetStateAction<number>>;
  onClickCategory: (id: number) => void;
}

function Categories(props: categoriesProps) {
  const categories: Array<string> = [
    'Все',
    'Мясные',
    'Вегетарианская',
    'Гриль',
    'Острые',
    'Закрытые',
  ];

  return (
    <div className="categories">
      <ul>
        {categories.map((categoryName, index) => (
          <li
            key={categoryName}
            onClick={() => props.onClickCategory(index)}
            className={props.value === index ? 'active' : ''}
          >
            {categoryName}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
