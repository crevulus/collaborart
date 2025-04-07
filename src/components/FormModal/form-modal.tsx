"use client";

import React from "react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { zodResolver } from "@hookform/resolvers/zod";
import type { ZodType } from "zod";
import { useForm } from "react-hook-form";
import { X } from "lucide-react";

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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";

// Reusable form modal component that can be used for different forms
interface FormModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  formSchema: ZodType<Record<string, unknown>>;
  defaultValues: Record<string, unknown>;
  fields: {
    name: string;
    label?: string;
    placeholder: string;
    type?: string;
    inputMode?: "text" | "numeric" | "email" | "tel" | "url";
    pattern?: string;
    maxLength?: number;
  }[];
  onSubmit: (values: Record<string, unknown>) => void | Promise<void>;
  submitButtonText?: string;
  submitButtonIcon?: React.ReactNode;
  isLoading?: boolean;
  customContent?: React.ReactNode;
  onFieldChange?: (name: string, value: unknown) => void;
  isSubmitDisabled?: boolean;
}

export function FormModal({
  open,
  onClose,
  title,
  description,
  formSchema,
  defaultValues,
  fields,
  onSubmit,
  submitButtonText,
  submitButtonIcon,
  isLoading = false,
  isSubmitDisabled = false,
  customContent,
  onFieldChange,
}: FormModalProps) {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const handleSubmit = async (values: Record<string, unknown>) => {
    await onSubmit(values);
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
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>
        </VisuallyHidden>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            {customContent}
            {fields.map((field) => (
              <FormField
                key={field.name}
                name={field.name}
                control={form.control}
                render={({ field: formField }) => (
                  <FormItem>
                    {field.label && (
                      <label className="text-sm font-medium">
                        {field.label}
                      </label>
                    )}
                    <FormControl>
                      <Input
                        placeholder={field.placeholder}
                        className="h-12 text-center text-lg"
                        type={field.type ?? "text"}
                        inputMode={field.inputMode}
                        pattern={field.pattern}
                        maxLength={field.maxLength}
                        value={formField.value as string}
                        onChange={(e) => {
                          formField.onChange(e);
                          if (onFieldChange) {
                            onFieldChange(field.name, e.target.value);
                          }
                        }}
                        onBlur={formField.onBlur}
                        name={formField.name}
                        ref={formField.ref}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
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
                  disabled={isSubmitDisabled || isLoading}
                >
                  {submitButtonIcon ?? submitButtonText}
                </Button>
              </div>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
      {description && (
        <VisuallyHidden>
          <DialogDescription>{description}</DialogDescription>
        </VisuallyHidden>
      )}
    </Dialog>
  );
}
