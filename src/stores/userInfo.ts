import { create } from 'zustand';

type UserInfoType = {
  profileUrl?: string;
  defaultProfileNum: number;
  name: string;
  email: string;
  bio?: string;
  link?: string;
};

interface UserInfoState {
  userInfo: UserInfoType;
  setUserInfo: (userInfo: UserInfoType) => void;
  fatchUserInfo?: () => void;
}

const useStore = create<UserInfoState>((set) => ({
  userInfo: {
    profileUrl: '',
    defaultProfileNum: 0,
    name: '',
    email: '',
  },
  setUserInfo: (userInfo) => set(() => ({ userInfo })),
}));

export default useStore;
