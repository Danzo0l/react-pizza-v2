import { useCallback, useContext, useRef, useState } from 'react';
import debounce from 'lodash.debounce';
import { SearchContext, contextObject } from '../../App';
import styles from './Search.module.scss';

function Search() {
  const [searchValueLocal, setSearchValueLocal] = useState<string>('');
  const { setSearchValue } = useContext<contextObject>(SearchContext);

  // eslint-disable-next-line
  const updateSearchValue = useCallback(
    debounce((value: string) => {
      setSearchValue(value);
    }, 600),
    []
  );

  const inputRef = useRef<HTMLInputElement | null>(null);

  const onClickClear = () => {
    setSearchValueLocal('');
    setSearchValue('');
    inputRef.current?.focus();
  };

  return (
    <div className={styles.search}>
      <svg
        className={styles.icon}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <path d="M3.624,15a8.03,8.03,0,0,0,10.619.659l5.318,5.318a1,1,0,0,0,1.414-1.414l-5.318-5.318A8.04,8.04,0,0,0,3.624,3.624,8.042,8.042,0,0,0,3.624,15Zm1.414-9.96a6.043,6.043,0,1,1-1.77,4.274A6,6,0,0,1,5.038,5.038Z" />
      </svg>
      <input
        ref={inputRef}
        value={searchValueLocal}
        onChange={(event) => {
          setSearchValueLocal(event.target.value);
          updateSearchValue(event.target.value);
        }}
        className={styles.input}
        placeholder="Поиск пиццы"
      />
      {searchValueLocal && (
        <svg
          onClick={onClickClear}
          className={styles.clearIcon}
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          fill="#000000"
          height="800px"
          width="800px"
          version="1.1"
          id="Capa_1"
          viewBox="0 0 460.775 460.775"
          xmlSpace="preserve"
        >
          <path d="M285.08,230.397L456.218,59.27c6.076-6.077,6.076-15.911,0-21.986L423.511,4.565c-2.913-2.911-6.866-4.55-10.992-4.55  c-4.127,0-8.08,1.639-10.993,4.55l-171.138,171.14L59.25,4.565c-2.913-2.911-6.866-4.55-10.993-4.55  c-4.126,0-8.08,1.639-10.992,4.55L4.558,37.284c-6.077,6.075-6.077,15.909,0,21.986l171.138,171.128L4.575,401.505  c-6.074,6.077-6.074,15.911,0,21.986l32.709,32.719c2.911,2.911,6.865,4.55,10.992,4.55c4.127,0,8.08-1.639,10.994-4.55  l171.117-171.12l171.118,171.12c2.913,2.911,6.866,4.55,10.993,4.55c4.128,0,8.081-1.639,10.992-4.55l32.709-32.719  c6.074-6.075,6.074-15.909,0-21.986L285.08,230.397z" />
        </svg>
      )}
    </div>
  );
}

export default Search;
