import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Lang = 'es' | 'en';

export interface ImageModalState {
  src: string;
  title: string;
  width: number;
  height: number;
}

export interface AppStore {
  bootDone: boolean;
  expandedProject: string | null;
  focusIndex: number;
  imageModal: ImageModalState | null;
  lang: Lang;
  completeBoot: () => void;
  toggleProject: (slug: string) => void;
  setFocus: (index: number) => void;
  openImageModal: (data: ImageModalState) => void;
  closeImageModal: () => void;
  setLang: (lang: Lang) => void;
}

export const useAppStore = create<AppStore>()(
  persist(
    (set) => ({
      bootDone: false,
      expandedProject: null,
      focusIndex: -1,
      imageModal: null,
      lang: 'es',

      completeBoot: () => set({ bootDone: true }),
      toggleProject: (slug) =>
        set((s) => ({ expandedProject: s.expandedProject === slug ? null : slug })),
      setFocus: (index) => set({ focusIndex: index }),
      openImageModal: (data) => set({ imageModal: data }),
      closeImageModal: () => set({ imageModal: null }),
      setLang: (lang) => {
        if (typeof document !== 'undefined') document.documentElement.lang = lang;
        set({ lang });
      },
    }),
    {
      name: 'amm-os-store',
      version: 1,
      migrate: (persisted) => {
        const state = persisted as Partial<AppStore>;
        return { lang: state.lang ?? 'es' };
      },
      partialize: (s): Pick<AppStore, 'lang'> => ({ lang: s.lang }),
    }
  )
);
