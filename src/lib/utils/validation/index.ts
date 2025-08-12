/**
 * 빈 값(null, undefined, 빈 문자열)을 나타내는 타입
 */
type EmptyValue = null | undefined | '';

/**
 * 객체에서 빈 값을 제거한 후의 타입을 정의
 */
type RemoveEmptyValues<T> = {
  [K in keyof T]: T[K] extends EmptyValue ? never : T[K];
};

/**
 * 객체의 값이 없는 필드를 제거하여 반환한다.
 * 원본 객체는 변경되지 않는다.
 *
 * @param obj 검증할 데이터 객체
 * @returns 값이 없는 필드가 제거된 새로운 객체
 *
 * @example
 * const data = { name: 'John', age: null, email: '', phone: '123-456-7890' };
 * const cleaned = convertValidationObjectValue(data);
 * // 결과: { name: 'John', phone: '123-456-7890' }
 */
export const convertValidationObjectValue = <T extends Record<string, unknown>>(
  obj: T,
): Partial<RemoveEmptyValues<T>> => {
  const result = { ...obj };

  (Object.keys(result) as Array<keyof T>).forEach(key => {
    const value = result[key];
    if (value === undefined || value === null || value === '') {
      delete result[key];
    }
  });

  return result as Partial<RemoveEmptyValues<T>>;
};
