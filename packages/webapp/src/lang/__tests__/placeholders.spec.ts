import ar from '../ar/index.json';
import en from '../en/index.json';
import es from '../es/index.json';
import sv from '../sv/index.json';

const placeholders = (message: string): string[] =>
  Array.from(message.matchAll(/\{(\w+)\}/g), (match) => match[1]).sort();

describe('transactions locking messages', () => {
  // TransactionsLocking/components.tsx formats this message with
  // `fromDate` and `toDate`.
  const key = 'transactions_locking.partial_unlocked_from';

  it.each([
    ['ar', ar],
    ['en', en],
    ['es', es],
    ['sv', sv],
  ] as const)('uses the caller placeholders in %s', (_locale, catalogue) => {
    const message = (catalogue as unknown as Record<string, string>)[key];

    expect(placeholders(message)).toEqual(['fromDate', 'toDate']);
  });
});
