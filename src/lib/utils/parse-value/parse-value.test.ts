import { parseValue } from '.';

describe('parseValue 함수', () => {
  describe('기본 파싱', () => {
    test('기본적으로 문자열로 파싱해야 한다', () => {
      expect(parseValue(123)).toBe('123');
      expect(parseValue(true)).toBe('true');
      expect(parseValue('hello')).toBe('hello');
    });
  });

  describe('숫자 파싱', () => {
    test('문자열을 숫자로 파싱해야 한다', () => {
      expect(parseValue('123', { parser: Number })).toBe(123);
      expect(parseValue('0', { parser: Number })).toBe(0);
      expect(parseValue('-10.5', { parser: Number })).toBe(-10.5);
    });

    test('이미 숫자인 값은 그대로 반환해야 한다', () => {
      expect(parseValue(123, { parser: Number })).toBe(123);
      expect(parseValue(0, { parser: Number })).toBe(0);
      expect(parseValue(-10.5, { parser: Number })).toBe(-10.5);
    });

    test('숫자로 파싱할 수 없는 값은 undefined를 반환해야 한다', () => {
      expect(parseValue('abc', { parser: Number })).toBeUndefined();
      expect(parseValue('123abc', { parser: Number })).toBeUndefined();
    });

    test('숫자로 파싱할 수 없는 값에 기본값이 제공되면 기본값을 반환해야 한다', () => {
      expect(parseValue('abc', { parser: Number, defaultValue: 0 })).toBe(0);
      expect(parseValue('123abc', { parser: Number, defaultValue: -1 })).toBe(-1);
    });
  });

  describe('불리언 파싱', () => {
    test('문자열을 불리언으로 파싱해야 한다', () => {
      expect(parseValue('true', { parser: Boolean })).toBe(true);
      expect(parseValue('false', { parser: Boolean })).toBe(false);
    });

    test('이미 불리언인 값은 그대로 반환해야 한다', () => {
      expect(parseValue(true, { parser: Boolean })).toBe(true);
      expect(parseValue(false, { parser: Boolean })).toBe(false);
    });

    test('불리언으로 파싱할 수 없는 값은 undefined를 반환해야 한다', () => {
      expect(parseValue('yes', { parser: Boolean })).toBeUndefined();
      expect(parseValue('no', { parser: Boolean })).toBeUndefined();
      expect(parseValue('1', { parser: Boolean })).toBeUndefined();
      expect(parseValue('0', { parser: Boolean })).toBeUndefined();
    });

    test('불리언으로 파싱할 수 없는 값에 기본값이 제공되면 기본값을 반환해야 한다', () => {
      expect(parseValue('yes', { parser: Boolean, defaultValue: false })).toBe(false);
      expect(parseValue('1', { parser: Boolean, defaultValue: true })).toBe(true);
    });
  });

  describe('문자열 파싱', () => {
    test('값을 문자열로 파싱해야 한다', () => {
      expect(parseValue(123, { parser: String })).toBe('123');
      expect(parseValue(true, { parser: String })).toBe('true');
      expect(parseValue('hello', { parser: String })).toBe('hello');
    });

    test('이미 문자열인 값은 그대로 반환해야 한다', () => {
      expect(parseValue('123', { parser: String })).toBe('123');
      expect(parseValue('true', { parser: String })).toBe('true');
      expect(parseValue('hello', { parser: String })).toBe('hello');
    });
  });

  describe('커스텀 파서', () => {
    test('지원되지 않는 파서는 문자열로 파싱해야 한다', () => {
      // @ts-expect-error - 테스트를 위해 의도적으로 타입 에러를 무시
      expect(parseValue('123', { parser: Object })).toBe('123');
      // @ts-expect-error - 테스트를 위해 의도적으로 타입 에러를 무시
      expect(parseValue(123, { parser: Array })).toBe('123');
    });
  });

  describe('null/undefined 값 처리', () => {
    test('null 값은 기본값이 제공되면 기본값을 반환해야 한다', () => {
      expect(parseValue(null, { defaultValue: 'default' })).toBe('default');
      expect(parseValue(null, { parser: Number, defaultValue: 0 })).toBe(0);
      expect(parseValue(null, { parser: Boolean, defaultValue: false })).toBe(false);
    });

    test('undefined 값은 기본값이 제공되면 기본값을 반환해야 한다', () => {
      expect(parseValue(undefined, { defaultValue: 'default' })).toBe('default');
      expect(parseValue(undefined, { parser: Number, defaultValue: 0 })).toBe(0);
      expect(parseValue(undefined, { parser: Boolean, defaultValue: false })).toBe(false);
    });

    test('빈 문자열은 기본값이 제공되면 기본값을 반환해야 한다', () => {
      expect(parseValue('', { defaultValue: 'default' })).toBe('default');
      expect(parseValue('', { parser: Number, defaultValue: 0 })).toBe(0);
      expect(parseValue('', { parser: Boolean, defaultValue: false })).toBe(false);
    });

    test('기본값이 제공되지 않으면 기본 파싱 동작을 수행해야 한다', () => {
      expect(parseValue(null)).toBe('null');
      expect(parseValue(undefined)).toBe('undefined');
      expect(parseValue('')).toBe('');
    });
  });
});
