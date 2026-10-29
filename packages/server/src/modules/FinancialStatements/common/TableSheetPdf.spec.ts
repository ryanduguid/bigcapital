import { TableSheetPdf } from './TableSheetPdf';
import { ChromiumlyTenancy } from '../../ChromiumlyTenancy/ChromiumlyTenancy.service';
import { ITableData } from '../types/Table.types';

describe('TableSheetPdf', () => {
  it('renders the custom CSS and column styles into the sheet HTML', async () => {
    const convertHtmlContent = jest.fn().mockResolvedValue(Buffer.from(''));
    const tableSheetPdf = new TableSheetPdf({
      convertHtmlContent,
    } as unknown as ChromiumlyTenancy);

    const table = {
      columns: [{ key: 'name', label: 'Account', style: '{"width":"40%"}' }],
      rows: [{ cells: [{ key: 'name', value: 'Cash' }] }],
    } as unknown as ITableData;

    await tableSheetPdf.convertToPdf(
      table,
      'Organisation',
      'Trial Balance',
      'As of 2026-10-29',
      '.cell--name { font-weight: 600; }',
    );
    const [html] = convertHtmlContent.mock.calls[0];

    expect(html).toContain('.cell--name { font-weight: 600; }');
    expect(html).toContain('width:40%');
  });
});
