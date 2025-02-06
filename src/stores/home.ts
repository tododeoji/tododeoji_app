import { create } from 'zustand';
import { TodoItem } from '../types/todo';

interface SelectedDateStoreState {
  selectedDate: string;
  setSelectedDate: (selectedDate: string) => void;
}

export const useSelectedDateStore = create<SelectedDateStoreState>((set) => ({
  selectedDate: '',
  setSelectedDate: (selectedDate) => set(() => ({ selectedDate })),
}));

interface ExpandedStoreState {
  isExpanded: boolean;
  setIsExpanded: (isExpanded: boolean) => void;
  toggleExpanded: () => void;
}
export const useExpandedStore = create<ExpandedStoreState>((set) => ({
  isExpanded: true,
  setIsExpanded: (isExpanded: boolean) => set({ isExpanded }),
  toggleExpanded: () => set((state) => ({ isExpanded: !state.isExpanded })),
}));

interface TodayListStoreState {
  todoList: TodoItem[];
  progressList: TodoItem[];
  doneList: TodoItem[];
  setTodoList: (todoList: TodoItem[]) => void;
  setProgressList: (progressList: TodoItem[]) => void;
  setDoneList: (doneList: TodoItem[]) => void;
}

export const useTodayListStore = create<TodayListStoreState>((set) => ({
  todoList: [],
  progressList: [],
  doneList: [],
  setTodoList: (todoList: TodoItem[]) => set({ todoList }),
  setProgressList: (progressList: TodoItem[]) => set({ progressList }),
  setDoneList: (doneList: TodoItem[]) => set({ doneList }),
}));
