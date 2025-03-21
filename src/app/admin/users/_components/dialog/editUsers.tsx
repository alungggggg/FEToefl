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
import { UsersInterface } from "@/lib/interface";
import { editUsers } from "@/lib/redux/slice/usersSlice";
import { AppDispatch, RootState } from "@/lib/redux/store";
import { usersScema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { z } from "zod";

const EditUsers = ({
  editableUsers,
  setIsOpen,
}: {
  editableUsers: UsersInterface;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { isLoading } = useSelector((state: RootState) => state.users);
  const dispatch = useDispatch<AppDispatch>();

  const extendedUsersSchema = usersScema.omit({ password: true }).extend({
    id: z.number(),
  });

  const form = useForm<z.infer<typeof extendedUsersSchema>>({
    defaultValues: {
      id: parseInt(editableUsers.id),
      name: editableUsers.name,
      username: editableUsers.username,
      // password: editableUsers.password,
      exam: editableUsers.exam,
    },
    resolver: zodResolver(extendedUsersSchema),
  });

  async function handleEditUsers(value: z.infer<typeof extendedUsersSchema>) {
    try {
      const res = await dispatch(editUsers({ data: value }));
      if (res?.payload?.status == true) {
        toast.success("Successfully edit user");
      } else {
        toast.error("Failed to edit user");
      }
    } catch (error) {
      console.log(error);
    }
    setIsOpen(false);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((e) => handleEditUsers(e))}
        className="space-y-4"
      >
        <FormField
          control={form.control}
          name="id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Id</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Jhon Doe" disabled={true} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
        {/* <FormField
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
        /> */}
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
          <Button type="submit" className="bg-[#3674B5]" disabled={isLoading}>
            Edit
          </Button>
          <Button
            type="button"
            className="bg-[#3674B5]"
            disabled={isLoading}
            onClick={() => {
              setIsOpen(false);
            }}
          >
            Cancel
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default EditUsers;
