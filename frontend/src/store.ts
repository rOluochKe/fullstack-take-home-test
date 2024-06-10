import { create } from 'zustand';
import { Book } from './types/Types';

interface ReadingListState {
  readingList: Book[];
  addBook: (book: Book) => void;
  setReadingList: (books: Book[]) => void;
}

export const useReadingListStore = create<ReadingListState>((set) => ({
  readingList: [],
  addBook: (book: Book) => set((state) => ({
    readingList: [...state.readingList, book],
  })),
  setReadingList: (books: Book[]) => set(() => ({ readingList: books })),
}));
