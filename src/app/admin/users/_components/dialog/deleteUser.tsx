"use client";

import { Button } from "@/components/ui/button";
import { UsersInterface } from "@/lib/interface";
import { showDialog } from "@/lib/redux/slice/unautorizeDialogSlice";
import { deleteUsers } from "@/lib/redux/slice/usersSlice";
import { AppDispatch, RootState } from "@/lib/redux/store";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const DeleteUser = ({
  setIsOpen,
  deletedUser,
}: {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  deletedUser: UsersInterface | undefined;
}) => {
  const { isLoading } = useSelector((state: RootState) => state.users);
  const dispatch = useDispatch<AppDispatch>();

  async function handleDelete() {
    try {
      if (deletedUser) {
        const res = await dispatch(deleteUsers({ data: deletedUser }));
        if (
          res?.payload &&
          typeof res.payload === "object" &&
          "error" in res.payload
        ) {
          if ((res.payload.error as string).toLowerCase() == "unauthorized") {
            dispatch(showDialog());
          }
        } else if (res.payload) {
          toast.success("Successfully delete users");
        }
      }
    } catch (error) {
      console.log(error);
    }
    setIsOpen(false);
  }
  return (
    <section className="w-full flex justify-center space-x-2 mt-4">
      <Button
        className="w-full bg-red-500"
        onClick={() => handleDelete()}
        disabled={isLoading}
      >
        Delete
      </Button>
      <Button
        className="w-full bg-blue-500"
        onClick={() => setIsOpen(false)}
        disabled={isLoading}
      >
        Cancel
      </Button>
    </section>
  );
};

export default DeleteUser;
