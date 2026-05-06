import { useAppStore } from '../store/useAppStore';
import { es } from './es';
import { en } from './en';

export function useT() {
  const lang = useAppStore((s) => s.lang);
  return { t: lang === 'en' ? en : es, lang };
}
