import { parseValue } from '.';

describe('parseValue 함수', () => {
  describe('기본 파싱', () => {
    test('기본적으로 문자열로 파싱한다', () => {
      expect(parseValue(123)).toBe('123');
      expect(parseValue(true)).toBe('true');
      expect(parseValue('hello')).toBe('hello');
    });
  });

  describe('숫자 파싱', () => {
    test('유효한 숫자 문자열을 숫자로 파싱한다', () => {
      expect(parseValue('123', { parser: Number })).toBe(123);
      expect(parseValue('0', { parser: Number })).toBe(0);
      expect(parseValue('-10.5', { parser: Number })).toBe(-10.5);
    });

    test('이미 숫자인 값은 그대로 반환한다', () => {
      expect(parseValue(123, { parser: Number })).toBe(123);
      expect(parseValue(0, { parser: Number })).toBe(0);
    });

    test('파싱 실패 시 기본값을 반환한다', () => {
      expect(parseValue('abc', { parser: Number, defaultValue: 0 })).toBe(0);
    });
  });

  describe('불리언 파싱', () => {
    test('유효한 불리언 문자열을 불리언으로 파싱한다', () => {
      expect(parseValue('true', { parser: Boolean })).toBe(true);
      expect(parseValue('false', { parser: Boolean })).toBe(false);
    });

    test('이미 불리언인 값은 그대로 반환한다', () => {
      expect(parseValue(true, { parser: Boolean })).toBe(true);
      expect(parseValue(false, { parser: Boolean })).toBe(false);
    });

    test('파싱 실패 시 기본값을 반환한다', () => {
      expect(parseValue('yes', { parser: Boolean, defaultValue: false })).toBe(false);
    });
  });

  describe('null/undefined 처리', () => {
    test('null 값은 기본값을 반환한다', () => {
      expect(parseValue(null, { defaultValue: 'default' })).toBe('default');
    });

    test('undefined 값은 기본값을 반환한다', () => {
      expect(parseValue(undefined, { defaultValue: 'default' })).toBe('default');
    });

    test('기본값이 없으면 문자열로 변환한다', () => {
      expect(parseValue(null)).toBe('null');
      expect(parseValue(undefined)).toBe('undefined');
    });
  });
});
