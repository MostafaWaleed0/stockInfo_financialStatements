import { SetStateAction, useState } from "react";

const useLocalStorage = <T,>(
  key: string,
  initialValue: T,
): [T, React.Dispatch<SetStateAction<T>>] => {
  const [state, setState] = useState(() => {
    try {
      if (typeof window !== "undefined") {
        const value = window.localStorage.getItem(key);
        return value ? JSON.parse(value) : initialValue;
      }
      return initialValue;
    } catch (error) {
      console.error("Error in useLocalStorage initial state:", error);
      return initialValue;
    }
  });

  const setValue = (value: SetStateAction<T>): void => {
    try {
      if (typeof window !== "undefined") {
        const valueToStore = value instanceof Function ? value(state) : value;
        setState(valueToStore); // Corrected this line
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error("Error in useLocalStorage setValue:", error);
    }
  };

  return [state, setValue];
};

export default useLocalStorage;
