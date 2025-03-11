"use client";

import React, { type ChangeEvent, type FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { CreateArtistSteps } from "~/types/CreateArtist";
import { DialogDescription } from "@radix-ui/react-dialog";
import { createNewGrid } from "~/app/actions/createNewGrid";
import useLocalStorage from "~/hooks/useLocalStorage";
import { DEVICE_ID_LOCAL_STORAGE_KEY } from "~/lib/constants";
import { TRPCError } from "@trpc/server";

interface CreateArtistFlowProps {
  open: boolean;
  onClose: () => void;
}

export function CreateArtistFlow({ open, onClose }: CreateArtistFlowProps) {
  const router = useRouter();
  const [step, setStep] = useState<
    CreateArtistSteps.Name | CreateArtistSteps.Pin
  >(CreateArtistSteps.Name);
  const [name, setName] = useState("");
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { getValue } = useLocalStorage({
    key: DEVICE_ID_LOCAL_STORAGE_KEY,
    defaultValue: "",
  });

  const handleNameSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (name.trim().length < 2) {
      setError("Name must be at least 2 characters");
      return;
    }
    setError("");
    setStep(CreateArtistSteps.Pin);
  };

  const handlePinSubmit = async (e: FormEvent) => {
    setIsLoading(true);
    e.preventDefault();
    if (pin.length !== 4) {
      setError("PIN must be 4 digits");
      return;
    }

    try {
      await createNewGrid(getValue());

      router.push("/grid");
    } catch (error) {
      console.error(error);
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePinChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newPin = e.target.value.replace(/\D/g, "").slice(0, 4);
    setPin(newPin);
    setError("");
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {step === CreateArtistSteps.Name
              ? "Enter Your Name"
              : "Create a PIN"}
          </DialogTitle>
        </DialogHeader>
        {step === CreateArtistSteps.Name ? (
          <form onSubmit={handleNameSubmit} className="space-y-4">
            <Input
              placeholder="Name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setError("");
              }}
              className="h-12 text-center text-lg"
            />
            {error && (
              <p className="text-center text-sm text-red-500">{error}</p>
            )}
            <Button type="submit" className="w-full">
              Continue
            </Button>
          </form>
        ) : (
          <form onSubmit={handlePinSubmit} className="space-y-4">
            <Input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={4}
              placeholder="PIN"
              value={pin}
              onChange={handlePinChange}
              className="h-12 text-center text-lg"
            />
            {error && (
              <p className="text-center text-sm text-red-500">{error}</p>
            )}
            <Button
              type="submit"
              className="w-full"
              loading={isLoading}
              disabled={isLoading || pin.length !== 4}
            >
              Create Grid
            </Button>
          </form>
        )}
      </DialogContent>
      <VisuallyHidden>
        <DialogDescription>
          Step 1: Input name. Step 2: Choose a PIN.
        </DialogDescription>
      </VisuallyHidden>
    </Dialog>
  );
}
