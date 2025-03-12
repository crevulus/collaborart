"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { ArrowRight, X } from "lucide-react";
import clsx from "clsx";

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
import { createNewGrid } from "~/app/actions/createNewGrid";
import useLocalStorage from "~/hooks/useLocalStorage";
import { DEVICE_ID_LOCAL_STORAGE_KEY } from "~/lib/constants";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { SearchParams } from "~/enums/general";

interface CreateArtistFlowProps {
  open: boolean;
  onClose: () => void;
}

export function CreateArtistFlow({ open, onClose }: CreateArtistFlowProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { getValue } = useLocalStorage({
    key: DEVICE_ID_LOCAL_STORAGE_KEY,
    defaultValue: "",
  });

  const formSchema = z.object({
    name: z.string().min(2, {
      message: "Name must be at least 2 characters.",
    }),
    pin: z
      .string()
      .min(4, {
        message: "PIN must be > 4 digits.",
      })
      .max(6, {
        message: "PIN must be < 6 digits.",
      }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      pin: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);

    setIsLoading(true);

    try {
      const newGrid = await createNewGrid(getValue());

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
