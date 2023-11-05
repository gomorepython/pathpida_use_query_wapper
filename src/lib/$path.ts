import type { OptionalQuery as OptionalQuery_1kapjr8 } from '../pages/[id]';

export const pagesPath = {
  _id: (id: string | number) => ({
    $url: (url?: { query?: OptionalQuery_1kapjr8 | undefined, hash?: string | undefined } | undefined) => ({ pathname: '/[id]' as const, query: { id, ...url?.query }, hash: url?.hash })
  }),
  $url: (url?: { hash?: string | undefined } | undefined) => ({ pathname: '/' as const, hash: url?.hash })
};

export type PagesPath = typeof pagesPath;
