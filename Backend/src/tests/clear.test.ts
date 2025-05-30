import { clearWrapper } from '../serverWrappers';

test('Test return value', () => {
  expect(clearWrapper()).toStrictEqual({});
});
