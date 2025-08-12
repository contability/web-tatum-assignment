import { convertValidationObjectValue } from './index';

describe('convertValidationObjectValue', () => {
  it('빈 값들을 제거한다', () => {
    const input = { name: 'John', email: '', age: null, address: undefined };
    const result = convertValidationObjectValue(input);

    expect(result).toEqual({ name: 'John' });
  });

  it('0과 false는 유효한 값으로 처리한다', () => {
    const input = { count: 0, isActive: false, name: '' };
    const result = convertValidationObjectValue(input);

    expect(result).toEqual({ count: 0, isActive: false });
  });

  it('빈 객체를 처리한다', () => {
    const input = {};
    const result = convertValidationObjectValue(input);

    expect(result).toEqual({});
  });
});
