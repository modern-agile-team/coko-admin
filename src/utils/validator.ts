type Falsy = false | null | undefined | 0 | '' | [] | Record<string, never>;

type FilterFalsy<T> = {
  [K in keyof T as T[K] extends Falsy ? never : K]: T[K];
};
/**
 * @description 이메일 주소가 RFC 5322 표준에 따라 유효한 형식인지 확인합니다.
 *
 * @see https://www.ietf.org/rfc/rfc5322.txt
 *
 * - 이메일 형식은 일반적인 표준에 따라 검사되며, 유효하지 않은 문자나 잘못된 형식이 포함되어 있으면 `false`를 반환합니다.
 *
 * @param email - 유효성을 검사할 이메일 주소 문자열
 * @returns 이메일 형식이 유효하면 `true`, 그렇지 않으면 `false`
 *
 * @example
 * isValidEmail("example@example.com"); // true
 * isValidEmail("invalid-email");       // false
 * isValidEmail("user@domain..com");    // false
 */
export function isValidEmail(email: string) {
  const regex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return regex.test(email);
}
export const isImage = (file: File) => {
  return file.type.startsWith('image/');
};

export const filterFalsyValues = <T extends Record<string, any>>(
  obj: T
): FilterFalsy<T> => {
  const result = {} as FilterFalsy<T>;

  for (const key in obj) {
    const value = obj[key];
    if (value) {
      (result as any)[key] = value; // 안전한 타입 캐스팅
    }
  }

  return result;
};
