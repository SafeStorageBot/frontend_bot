import { getDefaultLang } from './telegram';

const en = {
  ADD: 'Add',
  REVEAL: 'Reveal',
  VERIFY: 'Verify',
  BACK: 'Back',
  HOME: 'Home',
  COPY: 'Copy',
  REMOVE: 'Remove',
  PASSWORD: 'Secret',
  ENTER_MASTER_KEY: 'Enter your master-key',
  LIMITED_VERSION_INFO: 'Limited version. Maximum you can store',
  LIMITED_VERSION_INFO_PASSWORDS: 'secrets',
  UNLIMITED_VERSION_INFO: 'Unlimited version until',
  ERR_TITLE: 'Error happens during request',
  ERR_DESC: 'Please close and reopen the app, then try again',
  LIST_INFO: 'List of secrets',
  LIST_INFO_TIP: 'You can add a secret via the Add button',
  ENTER_TITLE: 'Enter title',
  TITLE_VALIDATION: 'Required, max length is 40',
  ENTER_PASSWORD: 'Enter your secret',
  PASSWORD_VALIDATION: 'Length must be 4 to 100 symbols',
  MASTER_KEY_ERROR: 'Error: invalid master-key for this secret',
  MIN_LENGTH_4: 'Min length is 4 symbols',
  COPIED: 'Copied!',
  COPY_ERROR: 'Copy failed',
  SAVE_ERROR: 'Error while saving the encrypted secret',
  REMOVE_ERROR: 'Error while removing secrets',
};

const ru: typeof en = {
  ADD: 'Добавить',
  REVEAL: 'Показать',
  VERIFY: 'Подтвердить',
  BACK: 'Назад',
  HOME: 'Домой',
  COPY: 'Скопировать',
  REMOVE: 'Удалить',
  PASSWORD: 'Секрет',
  ENTER_MASTER_KEY: 'Введите мастер-ключ',
  LIMITED_VERSION_INFO: 'Limited версия. Максимально можно хранить',
  LIMITED_VERSION_INFO_PASSWORDS: 'секретов',
  UNLIMITED_VERSION_INFO: 'Unlimited версия до',
  ERR_TITLE: 'Ошибка запроса',
  ERR_DESC: 'Закройте и снова откройте приложение, затем повторите',
  LIST_INFO: 'Список секретов',
  LIST_INFO_TIP: 'Вы можете добавить секрет кнопкой «Добавить»',
  ENTER_TITLE: 'Введите название',
  TITLE_VALIDATION: 'Поле обязательно, макс. 40 символов',
  ENTER_PASSWORD: 'Введите секрет',
  PASSWORD_VALIDATION: 'Длина от 4 до 100 символов',
  MASTER_KEY_ERROR: 'Ошибка: неверный мастер-ключ для этого секрета',
  MIN_LENGTH_4: 'Минимальная длина 4 символа',
  COPIED: 'Скопировано!',
  COPY_ERROR: 'Не удалось скопировать',
  SAVE_ERROR: 'Ошибка при сохранении зашифрованного секрета',
  REMOVE_ERROR: 'Ошибка при удалении секретов',
};

export type I18nKey = keyof typeof en;

export const lang = getDefaultLang();
const dict = lang === 'ru' ? ru : en;

export function t(key: I18nKey): string {
  return dict[key];
}

export function formatDate(iso: string): string {
  const date = new Date(iso);
  if (isNaN(date.getTime())) {
    return iso;
  }
  return date.toLocaleString(lang === 'ru' ? 'ru-RU' : 'en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}
