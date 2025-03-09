"use client";

import { useEffect } from "react";
import useLocalStorage from "~/hooks/useLocalStorage";
import { DEVICE_ID_LOCAL_STORAGE_KEY } from "~/lib/constants";
import { api } from "~/trpc/react";

export default function LocalStorageChecker() {
  const { setValue, getValue } = useLocalStorage({
    key: DEVICE_ID_LOCAL_STORAGE_KEY,
    defaultValue: "",
  });

  const value = getValue();

  const { mutate } = api.devices.create.useMutation({
    onSuccess: (data) => {
      if (!value) setValue(data.id);
    },
  });

  useEffect(() => {
    if (!value) {
      mutate();
    } else {
      console.log("Device ID already exists:", value);
    }
  }, []);

  return null;
}
