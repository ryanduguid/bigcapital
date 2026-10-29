import {
  accountsPayable,
  accountsReceivable,
  financialAccounting,
  productsServices,
} from '../homepageOptions';

describe('homepage shortcut options', () => {
  // The homepage hides shortcuts that lack permission metadata, so every
  // shortcut must declare the subject and ability it requires.
  const sections = [
    ...accountsReceivable,
    ...accountsPayable,
    ...financialAccounting,
    ...productsServices,
  ];

  it.each(
    sections.flatMap(({ shortcuts }) =>
      shortcuts.map((shortcut) => [shortcut.link, shortcut] as const),
    ),
  )('declares the permission of the %s shortcut', (_link, shortcut) => {
    expect(shortcut.subject).toBeDefined();
    expect(shortcut.ability).toBeDefined();
  });
});
