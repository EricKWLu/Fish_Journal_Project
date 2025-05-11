import { clearWrapper } from "../serverWrappers";
import { clear } from "../clear";

test('Test return value', () => {
    expect(clearWrapper()).toStrictEqual({});
})