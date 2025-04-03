"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { ArrowRight, X } from "lucide-react";

import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { DialogClose, DialogDescription } from "@radix-ui/react-dialog";
import useLocalStorage from "~/hooks/useLocalStorage";
import { DEVICE_ID_LOCAL_STORAGE_KEY } from "~/lib/constants";
import { Form, FormControl, FormField, FormItem } from "./ui/form";
import { SearchParams } from "~/enums/general";
import { api } from "~/trpc/react";
import { pinSchema, usernameSchema } from "~/lib/validations";

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

  const form = useForm<z.infer<typeof createArtistFormSchema>>({
    resolver: zodResolver(createArtistFormSchema),
    defaultValues: {
      name: "",
      pin: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof createArtistFormSchema>) => {
    setIsLoading(true);

    try {
      const newGrid = await createGrid.mutateAsync({
        device_id: getDeviceId(),
        username: values.name,
        pin: values.pin,
      });

      router.push(`/grid?${SearchParams.GridId}=${newGrid.id}`);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseModal = () => {
    onClose();
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={handleCloseModal}>
      <DialogContent crossIcon={false}>
        {/* necessary for screen readers */}
        <VisuallyHidden>
          <DialogHeader>
            <DialogTitle>Create New Grid</DialogTitle>
          </DialogHeader>
        </VisuallyHidden>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Name"
                      className="h-12 text-center text-lg"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="pin"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      maxLength={6}
                      placeholder="PIN"
                      className="h-12 text-center text-lg"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <DialogFooter className="sm:justify-start">
              <div className="flex w-full justify-between">
                <DialogClose asChild>
                  <Button type="button">
                    <X className="h-4 w-4" />
                  </Button>
                </DialogClose>
                <Button
                  type="submit"
                  className="rounded-full"
                  loading={isLoading}
                  disabled={isLoading}
                >
                  <ArrowRight />
                </Button>
              </div>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
      <VisuallyHidden>
        <DialogDescription>
          Step 1: Input name. Step 2: Choose a PIN.
        </DialogDescription>
      </VisuallyHidden>
    </Dialog>
  );
}
