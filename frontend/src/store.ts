import { create } from 'zustand';
import { Book } from './types/Types';

interface ReadingListState {
  readingList: Book[];
  addBook: (book: Book) => void;
  removeBook: (title: string) => void;
  setReadingList: (books: Book[]) => void;
}

export const useReadingListStore = create<ReadingListState>((set) => ({
  readingList: [],
  addBook: (book: Book) =>
    set((state) => ({
      readingList: [...state.readingList, book],
    })),
  removeBook: (title: string) =>
    set((state) => ({
      readingList: state.readingList.filter((book) => book.title !== title),
    })),
  setReadingList: (books: Book[]) => set(() => ({ readingList: books })),
}));
