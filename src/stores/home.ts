import { create } from 'zustand';
import { TodoItem } from '../types/todo';
import { BottomSheetModal } from '@gorhom/bottom-sheet';

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

interface deleteTodoModalStoreState {
  isVisible: boolean;
  deleteItem?: TodoItem;
  openDeleteTodoModal: () => void;
  closeDeleteTodoModal: () => void;
  setDeleteItem: (deleteItem: TodoItem) => void;
}
export const useDeleteTodoModalStore = create<deleteTodoModalStoreState>((set) => ({
  isVisible: false,
  openDeleteTodoModal: () => set({ isVisible: true }),
  closeDeleteTodoModal: () => set({ isVisible: false }),
  setDeleteItem: (deleteItem: TodoItem) => set({ deleteItem }),
}));

interface categorySheetStoreState {
  ref?: React.RefObject<BottomSheetModal>;
  setRef: (ref: React.RefObject<BottomSheetModal>) => void;
  openCategorySheet: (ref: React.RefObject<BottomSheetModal>) => void;
  closeCategorySheet: (ref: React.RefObject<BottomSheetModal>) => void;
}
export const useBottomSheetStore = create<categorySheetStoreState>((set) => ({
  setRef: (ref: React.RefObject<BottomSheetModal>) => set({ ref }),
  openCategorySheet: (ref: React.RefObject<BottomSheetModal>) => {
    console.log('openSheet');
    ref?.current?.present();
  },
  closeCategorySheet: (ref: React.RefObject<BottomSheetModal>) => {
    console.log('closeSheet');
    ref?.current?.close();
  },
}));
