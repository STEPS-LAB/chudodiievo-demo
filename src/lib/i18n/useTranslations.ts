import { useLanguage } from './LanguageProvider';
import messagesUA from '../../../messages/ua.json';
import messagesEN from '../../../messages/en.json';

const messages: Record<string, Record<string, unknown>> = {
  ua: messagesUA,
  en: messagesEN,
};

export function useTranslations(namespace?: string) {
  const { locale } = useLanguage();
  
  const getTranslation = (key: string) => {
    const keys = key.split('.');
    let value: unknown = messages[locale];
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = (value as Record<string, unknown>)[k];
      } else {
        return key;
      }
    }
    
    return value as string;
  };

  if (namespace) {
    return (key: string) => getTranslation(`${namespace}.${key}`);
  }

  return getTranslation;
}
