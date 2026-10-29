import intl from 'react-intl-universal';
import { getFiscalYear } from '../fiscalYearOptions';

const months = [
  'january',
  'february',
  'march',
  'april',
  'may',
  'june',
  'july',
  'august',
  'september',
  'october',
  'november',
  'december',
];

describe('getFiscalYear', () => {
  beforeAll(() =>
    intl.init({
      currentLocale: 'en',
      locales: { en: Object.fromEntries(months.map((m) => [m, m])) },
    }),
  );

  it.each(months.map((month, index) => [month, index]))(
    'ends the %s fiscal year in the preceding month',
    (month, index) => {
      const option = getFiscalYear().find((o) => o.key === month);
      const endMonth = months[(Number(index) + 11) % 12];

      expect(option?.name).toBe(`${month} - ${endMonth}`);
    },
  );
});
