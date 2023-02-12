import { createSlice } from '@reduxjs/toolkit';

export interface InitialState {
  categoryId: number;
  sort: {
    name: string;
    sortProperty: string;
    param: boolean;
  };
}

const initialState: InitialState = {
  categoryId: 0,
  sort: {
    name: 'популярности',
    sortProperty: 'raiting',
    param: false,
  },
};

const filterSlice = createSlice({
  name: 'filters',
  initialState: initialState,
  reducers: {
    setCategoryId(state, action) {
      state.categoryId = action.payload;
    },
    setSort(state, action) {
      state.sort = action.payload;
    },
  },
});

export const { setCategoryId, setSort } = filterSlice.actions;
export default filterSlice.reducer;
