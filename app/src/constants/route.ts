export const TARGET_URL = 'http://localhost:3000';

export const PAGES = {
  MAIN: '/',
  CATS_DETAIL: '/cats/detail',
};

export type PageNameKey =
  | 'Home'
  | 'CatsDetail';

export const PAGE_NAMES: Record<string, PageNameKey> = {
  [PAGES.MAIN]: 'Home',
  [PAGES.CATS_DETAIL]: 'CatsDetail',
};
