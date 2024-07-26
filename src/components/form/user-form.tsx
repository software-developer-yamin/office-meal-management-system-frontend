import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
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
import { userSchema } from "./schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUser, updateUser } from "@/services";
import React, { useEffect, useCallback } from "react";
import { User } from "@/types";
import { useToast } from "../ui/use-toast";

type UserFormProps = {
  modalInfo: { isOpen: boolean; data: User | null; type: "add" | "edit" };
  setModalInfo: React.Dispatch<
    React.SetStateAction<{
      isOpen: boolean;
      data: User | null;
      type: "add" | "edit";
    }>
  >;
};

export default function UserForm({ modalInfo, setModalInfo }: UserFormProps) {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      email: "",
      name: "",
      role: "USER",
      isBanned: false,
      password: "",
    },
  });

  const resetForm = useCallback(() => {
    form.reset(
      modalInfo.type === "edit"
        ? {
            email: modalInfo.data?.email ?? "",
            name: modalInfo.data?.name ?? "",
            role: modalInfo.data?.role ?? "USER",
            isBanned: modalInfo.data?.isBanned ?? false,
            password: modalInfo.data?.password ?? "",
          }
        : {
            email: "",
            name: "",
            role: "USER",
            isBanned: false,
            password: "",
          }
    );
  }, [form, modalInfo.type, modalInfo.data]);

  useEffect(() => {
    resetForm();
  }, [modalInfo.isOpen, resetForm]);

  const addMutation = useMutation({
    mutationFn: createUser,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast({
        title: "User Added",
        description: `User ${data.name} has been successfully added.`,
      });
      setModalInfo((prev) => ({ ...prev, isOpen: false, type: "add" }));
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message ?? "Failed to add user. Please try again.",
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateUser,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast({
        title: "User Updated",
        description: `User ${data.name} has been successfully updated.`,
      });
      setModalInfo((prev) => ({ ...prev, isOpen: false, type: "add" }));
    },
    onError: (error) => {
      toast({
        title: "Error",
        description:
          error.message ?? "Failed to update user. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = useCallback(
    (values: z.infer<typeof userSchema>) => {
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
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {modalInfo.type === "edit" ? "Edit User" : "Add User"}
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
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder="you@example.com"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" placeholder="Password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center justify-between">
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ADMIN">ADMIN</SelectItem>
                          <SelectItem value="USER">USER</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="isBanned"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <FormControl>
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="status"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                        <Label htmlFor="status">Is user banned</Label>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button
              type="submit"
              className="w-full"
              disabled={addMutation.isPending || updateMutation.isPending}
            >
              {modalInfo.type === "edit" ? "Update" : "Add"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
