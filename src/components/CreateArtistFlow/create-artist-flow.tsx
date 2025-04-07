"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { z } from "zod";

import useLocalStorage from "~/hooks/useLocalStorage";
import { DEVICE_ID_LOCAL_STORAGE_KEY } from "~/lib/constants";
import { SearchParams } from "~/enums/general";
import { api } from "~/trpc/react";
import { pinSchema, usernameSchema } from "~/lib/validations";
import { FormModal } from "~/components/FormModal";

interface CreateArtistFlowProps {
  open: boolean;
  onClose: () => void;
}

const createArtistFormSchema = z.object({
  name: usernameSchema,
  pin: pinSchema,
});

export function CreateArtistFlow({ open, onClose }: CreateArtistFlowProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { getValue: getDeviceId } = useLocalStorage({
    key: DEVICE_ID_LOCAL_STORAGE_KEY,
    defaultValue: "",
  });
  const createGrid = api.grids.create.useMutation();

  const handleSubmit = async (values: Record<string, unknown>) => {
    setIsLoading(true);

    try {
      const newGrid = await createGrid.mutateAsync({
        device_id: getDeviceId(),
        username: values.name as string,
        pin: values.pin as string,
      });

      router.push(`/grid?${SearchParams.GridId}=${newGrid.id}`);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FormModal
      open={open}
      onClose={onClose}
      title="Create New Grid"
      description="Step 1: Input name. Step 2: Choose a PIN."
      formSchema={createArtistFormSchema}
      defaultValues={{
        name: "",
        pin: "",
      }}
      fields={[
        {
          name: "name",
          placeholder: "Name",
        },
        {
          name: "pin",
          placeholder: "PIN",
          type: "text",
          inputMode: "numeric",
          pattern: "[0-9]*",
          maxLength: 6,
        },
      ]}
      onSubmit={handleSubmit}
      submitButtonIcon={<ArrowRight />}
      isLoading={isLoading}
    />
  );
}
