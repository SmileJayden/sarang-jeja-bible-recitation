import { useCallback, useState } from "react";
import lodashDebounce from "lodash/fp/debounce";

export function useLocalStorage<T>(key: string, initialValue: T) {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If error also return initialValue
      console.log(error);
      return initialValue;
    }
  });
  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
      // Save to local storage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.log(error);
    }
  };
  return [storedValue, setValue] as const;
}

export const debounce = (
  func: Function,
  wait: number,
  leading: boolean = false
): typeof func => {
  let inDebounce;
  return function () {
    const context = this;
    const args = arguments;

    // inDebounce 값이 변하기 전에 미리 저장하기 위해 사용
    let callNow = leading && !inDebounce;

    // leading이 아닌 경우에만 wait 이후 func가 실행되도록 함
    const later = () => {
      inDebounce = null;
      if (!leading) func.apply(context, args);
    };

    // setTimeout이 실행된 Timeout의 ID를 반환하고, clearTimeout()으로 이를 해제할 수 있음을 이용
    clearTimeout(inDebounce);
    inDebounce = setTimeout(later, wait);

    // 만약 leading=true이고 inDebounce가 없으면 func를 실행
    if (callNow) func.apply(context, args);
  };
};
