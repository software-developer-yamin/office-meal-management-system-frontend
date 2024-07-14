import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { itemSchema } from "./schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createItem, updateItem } from "@/services";
import React, { useEffect, useCallback } from "react";
import { Item } from "@/types";

type ModalFormProps = {
  modalInfo: { isOpen: boolean; data: Item | null; type: "add" | "edit" };
  setModalInfo: React.Dispatch<
    React.SetStateAction<{
      isOpen: boolean;
      data: Item | null;
      type: "add" | "edit";
    }>
  >;
};

export default function ModalForm({ modalInfo, setModalInfo }: ModalFormProps) {
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof itemSchema>>({
    resolver: zodResolver(itemSchema),
    defaultValues: {
      name: "",
      category: "PROTEIN",
    },
  });

  const resetForm = useCallback(() => {
    form.reset(
      modalInfo.type === "edit"
        ? {
            name: modalInfo.data?.name ?? "",
            category: modalInfo.data?.category ?? "PROTEIN",
          }
        : {
            name: "",
            category: "PROTEIN",
          }
    );
  }, [form, modalInfo.type, modalInfo.data]);

  useEffect(() => {
    resetForm();
  }, [modalInfo.isOpen, resetForm]);

  const addMutation = useMutation({
    mutationFn: createItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items"] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items"] });
    },
  });

  const onSubmit = useCallback(
    (values: z.infer<typeof itemSchema>) => {
      if (modalInfo.type === "edit" && modalInfo.data) {
        updateMutation.mutate({ ...values, id: modalInfo.data.id });
      } else {
        addMutation.mutate(values);
      }
      setModalInfo((prev) => ({ ...prev, isOpen: false, type: "add" }));
    },
    [modalInfo.type, modalInfo.data, updateMutation, addMutation, setModalInfo]
  );

  const handleDialogChange = useCallback(
    (open: boolean) => {
      setModalInfo((prev) => ({ ...prev, isOpen: open, type: "add" }));
    },
    [setModalInfo]
  );

  return (
    <Dialog onOpenChange={handleDialogChange} open={modalInfo.isOpen}>
      <DialogTrigger asChild>
        <Button>Add Item</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {modalInfo.type === "edit" ? "Edit Item" : "Add Item"}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} type="text" placeholder="Name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="PROTEIN">PROTEIN</SelectItem>
                        <SelectItem value="STARCH">STARCH</SelectItem>
                        <SelectItem value="VEGETABLE">VEGETABLE</SelectItem>
                        <SelectItem value="OTHER">OTHER</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              {modalInfo.type === "edit" ? "Update" : "Add"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
