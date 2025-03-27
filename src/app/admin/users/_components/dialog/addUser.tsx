"use client";

import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { showDialog } from "@/lib/redux/slice/unautorizeDialogSlice";
import { addUsers } from "@/lib/redux/slice/usersSlice";
import { AppDispatch, RootState } from "@/lib/redux/store";
import { usersScema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { z } from "zod";

const AddUser = ({
  setIsOpen,
}: {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { isLoading } = useSelector((state: RootState) => state.users);
  const dispatch = useDispatch<AppDispatch>();

  const form = useForm<z.infer<typeof usersScema>>({
    defaultValues: {
      name: "",
      username: "",
      password: "",
      exam: "",
    },
    resolver: zodResolver(usersScema),
  });

  async function handleAddUsers(values: z.infer<typeof usersScema>) {
    try {
      const res = await dispatch(addUsers(values));
      if (res?.payload?.error?.toLowerCase() == "unauthorized") {
        dispatch(showDialog());
      } else if (res?.payload?.errors?.username[0]) {
        toast.error(res?.payload?.errors?.username[0]);
      } else {
        toast.success("Successfully add users");
      }
      setIsOpen(false);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((e) => handleAddUsers(e))}
        className="space-y-4"
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Jhon Doe" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Jhon Doe" />
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
        <FormField
          control={form.control}
          name="exam"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Exam</FormLabel>
              <FormControl>
                <Input {...field} placeholder="TOEFL" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <DialogFooter className="pt-6">
          <Button
            type="button"
            disabled={isLoading}
            onClick={() => setIsOpen(false)}
            className="bg-[#3674B5]"
          >
            Close
          </Button>
          <Button type="submit" className="bg-[#3674B5]" disabled={isLoading}>
            Add User
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default AddUser;
