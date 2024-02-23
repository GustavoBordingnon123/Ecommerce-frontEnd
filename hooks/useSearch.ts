// useSearch.ts
import create from 'zustand';

interface SearchState {
  inputValue: string;
  setInputValue: (value: string) => void;
}

const useSearch = create<SearchState>((set) => ({
  inputValue: '',
  setInputValue: (value: string) => set({ inputValue: value }),
}));

export const useSearchProvider = () => {
  const { inputValue, setInputValue } = useSearch();
  return { inputValue, setInputValue };
};