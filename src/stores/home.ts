import { create } from 'zustand';

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
  setIsExpanded: (updater: (prev: boolean) => boolean) => void;
}
export const useExpandedStore = create<ExpandedStoreState>((set) => ({
  isExpanded: true,
  setIsExpanded: (updater) =>
    set((state) => ({
      isExpanded: updater(state.isExpanded),
    })),
}));
