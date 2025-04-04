"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Lock, Unlock } from "lucide-react";
import { z } from "zod";

import { FormModal } from "~/components/form-modal";
import { SearchParams } from "~/enums/general";
import { pinSchema } from "~/lib/validations";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { cn } from "~/lib/utils";

interface PinInputModalProps {
  open: boolean;
  onClose: () => void;
  artist: {
    id: string;
    username: string;
    pin: number;
  };
}

const pinFormSchema = z.object({
  pin: pinSchema,
});

export function PinInputModal({ open, onClose, artist }: PinInputModalProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [pinValue, setPinValue] = useState("");

  useEffect(() => {
    if (open) {
      setPinValue("");
      setIsValid(false);
    }
  }, [open]);

  const handleSubmit = async (values: Record<string, unknown>) => {
    const enteredPin = values.pin as string;

    if (enteredPin === artist.pin.toString()) {
      setIsLoading(true);
      router.push(`/grid?${SearchParams.Artist}=${artist.id}`);
    } else {
      //
    }
  };

  const handlePinChange = (value: string) => {
    setPinValue(value);
    setIsValid(value.length > 0);
  };

  return (
    <FormModal
      open={open}
      onClose={onClose}
      title={`Continue as ${artist.username}`}
      description="Enter your PIN to access the grid"
      formSchema={pinFormSchema}
      defaultValues={{
        pin: "",
      }}
      fields={[
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
      submitButtonIcon={
        pinValue.length > 0 ? (
          <Unlock className="h-4 w-4" />
        ) : (
          <Lock className="h-4 w-4" />
        )
      }
      isLoading={isLoading}
      customContent={
        <div className="flex flex-col items-center gap-3">
          <Avatar
            className="border-border border-1 transition-transform group-hover:scale-105"
            avatarSize="lg"
          >
            <AvatarFallback>
              {artist.username.slice(0, 1).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <h3 className="text-lg font-medium">{artist.username}</h3>
        </div>
      }
      onFieldChange={(name: string, value: unknown) => {
        if (name === "pin") {
          handlePinChange(value as string);
        }
      }}
    />
  );
}
