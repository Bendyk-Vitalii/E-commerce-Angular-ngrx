import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const CategoriesActions = createActionGroup({
  source: 'Categories API',
  events: {
    'Categories List Request': emptyProps,
    'Loaded Success': props<{ categories: ReadonlyArray<string> }>(),
    'Loaded Error': props<{ error: string | null }>(),
  },
});
