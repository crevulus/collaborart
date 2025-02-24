import { useState, useEffect, type Dispatch } from "react";

interface IUseLocalStorageProps {
  key: string;
  defaultValue: string;
}

const useLocalStorage = ({
  key,
  defaultValue,
}: IUseLocalStorageProps): {
  setValue: Dispatch<string>;
  getValue: () => string;
} => {
  const [value, setValue] = useState<string>(() => {
    let currentValue = "";

    try {
      const item = localStorage.getItem(key);
      currentValue = item ? (JSON.parse(item) as string) : defaultValue;
    } catch (error) {
      currentValue = defaultValue;
    }

    return currentValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  const getValue = (): string => {
    try {
      const item = localStorage.getItem(key);
      return item ? (JSON.parse(item) as string) : defaultValue;
    } catch (error) {
      return defaultValue;
    }
  };

  return { setValue, getValue };
};

export default useLocalStorage;
