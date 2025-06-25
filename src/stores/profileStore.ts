import { create } from 'zustand';

type ProfileType = {
  id: string;
  profileImgUrl?: string;
  defaultProfileNum: number;
  name: string;
  email: string;
  introduce?: string;
  profileUrl?: string;
};

interface ProfileState {
  profileData: ProfileType | null;
  setProfileData: (data: ProfileType) => void;
  updateProfileData: (data: Partial<ProfileType>) => void;
  resetProfileData: () => void;
}

const useProfileStore = create<ProfileState>((set) => ({
  profileData: null,
  setProfileData: (data) => set({ profileData: data }),
  updateProfileData: (data) =>
    set((state) => ({
      profileData: state.profileData ? { ...state.profileData, ...data } : null,
    })),
  resetProfileData: () => set({ profileData: null }),
}));

export default useProfileStore;
