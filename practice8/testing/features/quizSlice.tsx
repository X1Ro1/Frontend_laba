import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ListsState {
  lists: string[][];
  results: number[];
  choiceAnswers: { [quizIndex: number]: number[] };
}

const initialState: ListsState = {
  lists: [],
  results: [],
  choiceAnswers: {},
};

const listsSlice = createSlice({
  name: 'lists',
  initialState,
  reducers: {
    addList: (state, action: PayloadAction<{ index: number; items: string[] }>) => {
      const { index, items } = action.payload;
      state.lists[index] = items;
    },
    setDraggedItems: (state, action: PayloadAction<{ index: number; items: string[] }>) => {
      const { index, items } = action.payload;
      if (index >= 0) {
        state.lists[index] = items;
      }
    },
    setChoiceAnswer: (state, action: PayloadAction<{ index: number; answers: string[] }>) => {
      const { index, answers } = action.payload;
      state.choiceAnswers[index] = answers;
    },
    setResult: (state, action: PayloadAction<{ index: number; count: number }>) => {
      state.results[action.payload.index] = action.payload.count;
    },
    resetQuiz: (state) => {
      state.lists = [];
      state.results = [];
      state.choiceAnswers = {};
    },
  },
});

export const { addList, setDraggedItems, setChoiceAnswer, setResult, resetQuiz } = listsSlice.actions;
export default listsSlice.reducer;