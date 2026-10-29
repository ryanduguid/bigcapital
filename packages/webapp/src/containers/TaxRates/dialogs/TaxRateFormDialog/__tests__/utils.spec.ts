import { defaultInitialValues, transformFormToReq } from '../utils';

const formValues = {
  ...defaultInitialValues,
  name: 'GST',
  code: 'GST',
  rate: '10',
  description: 'Description only edit',
};

describe('transformFormToReq', () => {
  it('keeps the inactive status of an edited tax rate', () => {
    expect(transformFormToReq(formValues, false).active).toBe(false);
  });

  it('marks a new tax rate as active by default', () => {
    expect(transformFormToReq(formValues).active).toBe(true);
  });

  it('converts the rate to a number', () => {
    expect(transformFormToReq(formValues).rate).toBe(10);
  });
});
