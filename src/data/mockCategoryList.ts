export interface CategoryItem {
  id: string;
  title: string;
  color:
    | 'red1'
    | 'red2'
    | 'orange1'
    | 'orange2'
    | 'yellow1'
    | 'yellow2'
    | 'green1'
    | 'green2'
    | 'blue1'
    | 'blue2'
    | 'purple1'
    | 'purple2'
    | 'pink1'
    | 'pink2'
    | 'gray1'
    | 'gray2';
  isHidden: boolean;
}

export const mockCategoryList: CategoryItem[] = [
  { id: '1', title: '공부', color: 'red1', isHidden: false },
  { id: '2', title: '회사', color: 'yellow2', isHidden: false },
  { id: '3', title: '집', color: 'purple2', isHidden: false },
  { id: '4', title: '중요', color: 'green1', isHidden: false },
  { id: '5', title: '루틴', color: 'orange2', isHidden: false },
  { id: '6', title: '학교', color: 'blue2', isHidden: true },
];
