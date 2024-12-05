import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export interface DataState {
  menuCollapse?: boolean;
  toggleMenuCollapse: () => void;
}

export const useDataState = create<DataState>()(
  persist(
    (set, get) => ({
      menuCollapse: false,
      toggleMenuCollapse: () => set({ menuCollapse: !get().menuCollapse }),
    }),
    {
      name: 'menu-collapse', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
      skipHydration: true,
    },
  ),
);

interface aliyunSts {
  accessKeyId: string;
  accessKeySecret: string;
  securityToken: string;
  expiration: string;
}

export interface AliyunStsState {
  aliyunSts: aliyunSts;
  setAliyunStsToken: (aliyunSts: aliyunSts) => void;
}

export const useAliyunStsState = create<AliyunStsState>()(
  persist(
    (set, get) => ({
      aliyunSts: {
        accessKeyId: '',
        accessKeySecret: '',
        securityToken: '',
        expiration: '',
      },
      setAliyunStsToken: (aliyunSts) => set({ aliyunSts }),
    }),
    {
      name: 'aliyun-sts', // name of the item in thestorage (must be unique)
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
