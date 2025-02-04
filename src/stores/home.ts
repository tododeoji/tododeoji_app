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
  setIsExpanded: (isExpanded: boolean) => void;
  toggleExpanded: () => void;
}
export const useExpandedStore = create<ExpandedStoreState>((set) => ({
  isExpanded: true,
  setIsExpanded: (isExpanded: boolean) => set({ isExpanded }),
  toggleExpanded: () => set((state) => ({ isExpanded: !state.isExpanded })),
}));
