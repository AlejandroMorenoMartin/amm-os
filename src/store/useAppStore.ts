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
  onboardingDone: boolean;
  expandedProject: string | null;
  focusIndex: number;
  imageModal: ImageModalState | null;
  lang: Lang;
  soundEnabled: boolean;
  musicEnabled: boolean;
  volume: number;
  completeOnboarding: () => void;
  toggleProject: (slug: string) => void;
  setFocus: (index: number) => void;
  openImageModal: (data: ImageModalState) => void;
  closeImageModal: () => void;
  setLang: (lang: Lang) => void;
  toggleSound: () => void;
  toggleMusic: () => void;
  setVolume: (volume: number) => void;
}

export const useAppStore = create<AppStore>()(
  persist(
    (set) => ({
      onboardingDone: false,
      expandedProject: null,
      focusIndex: -1,
      imageModal: null,
      lang: 'es',
      soundEnabled: true,
      musicEnabled: true,
      volume: 0.2,

      completeOnboarding: () => set({ onboardingDone: true }),
      toggleProject: (slug) =>
        set((s) => ({ expandedProject: s.expandedProject === slug ? null : slug })),
      setFocus: (index) => set({ focusIndex: index }),
      openImageModal: (data) => set({ imageModal: data }),
      closeImageModal: () => set({ imageModal: null }),
      setLang: (lang) => {
        if (typeof document !== 'undefined') document.documentElement.lang = lang;
        set({ lang });
      },
      toggleSound: () => set((s) => ({ soundEnabled: !s.soundEnabled })),
      toggleMusic: () => set((s) => ({ musicEnabled: !s.musicEnabled })),
      setVolume: (volume) => set({ volume }),
    }),
    {
      name: 'amm-os-store',
      version: 4,
      migrate: (persisted) => {
        const state = persisted as Partial<AppStore>;
        return { lang: state.lang ?? 'es', volume: state.volume ?? 0.2 };
      },
      partialize: (s): Pick<AppStore, 'lang' | 'volume'> => ({
        lang: s.lang,
        volume: s.volume,
      }),
    }
  )
);
