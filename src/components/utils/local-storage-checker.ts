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

  const { mutate } = api.devices.create.useMutation();

  // const { data } = api.devices.getOne.useQuery({
  //   id: getValue(),
  // });

  // console.log({ data });

  useEffect(() => {
    if (!getValue()) {
      setValue(Date.now().toString());
      mutate();
    } else {
      console.log("Device ID already exists:", getValue());
    }
  }, [getValue, setValue]);

  return null;
}
