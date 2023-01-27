import React, { useState } from 'react';

interface stateType {
  name: string;
  sortProperty: string;
  param: boolean;
}

interface sortProps {
  value: stateType;
  onClickSort: React.Dispatch<React.SetStateAction<stateType>>;
  param: boolean;
}

function Sort(props: sortProps) {
  const sortType: Array<{ name: string; sortProperty: string }> = [
    { name: 'популярности', sortProperty: 'rating' },
    { name: 'цене', sortProperty: 'price' },
    { name: 'алфавиту', sortProperty: 'title' },
  ];

  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [sortParam, setSortParam] = useState<boolean>(false);

  const onClickList = (property: stateType) => {
    setIsVisible(!isVisible);
    if (property.sortProperty === 'rating') {
      setSortParam(true);
      props.onClickSort({
        name: property.name,
        sortProperty: property.sortProperty,
        param: true,
      });
    } else if (property.sortProperty === 'price') {
      setSortParam(false);
      props.onClickSort({
        name: property.name,
        sortProperty: property.sortProperty,
        param: false,
      });
    } else {
      props.onClickSort({
        name: property.name,
        sortProperty: property.sortProperty,
        param: sortParam,
      });
    }
  };

  const onClickButton = (property: stateType) => {
    setSortParam(!sortParam);
    setIsVisible(false);
    props.onClickSort({
      name: property.name,
      sortProperty: property.sortProperty,
      param: !sortParam,
    });
  };

  // console.log(`Sort by: ${sortParam ? 'up' : 'down'}`);

  return (
    <div className="sort">
      <div className="sort__label">
        <button
          onClick={() => onClickButton(props.value)}
          className={sortParam ? 'sort-btn sort-btn__active' : 'sort-btn'}
        >
          <svg
            width="15"
            height="9"
            viewBox="0 0 10 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
              fill="#2C2C2C"
            />
          </svg>
        </button>
        <b>Сортировка по:</b>
        <span onClick={() => setIsVisible(!isVisible)}>
          {sortType.filter((param) => param.name === props.value.name)[0].name}
        </span>
      </div>
      {isVisible && (
        <div className="sort__popup">
          <ul>
            {sortType.map((sortIteration, index) => (
              <li
                onClick={() => onClickList({ ...sortIteration, param: sortParam })}
                key={sortIteration.name}
                className={props.value.name === sortType[index].name ? 'active' : ''}
              >
                {sortIteration.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Sort;
