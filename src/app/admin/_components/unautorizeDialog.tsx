"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { RootState } from "@/lib/redux/store";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSelector } from "react-redux";

const UnautorizeDialog = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { isShow } = useSelector((state: RootState) => state.unautorizeDialog);

  async function goToSignInHandler() {
    setIsLoading(true);
    try {
      await fetch("/api/auth", {
        method: "DELETE",
      });

      router.push("/login");
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  }
  return (
    <Dialog open={isShow}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Unautorize</DialogTitle>
          <DialogDescription>
            your session is expired, please sign in again
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button disabled={isLoading} onClick={goToSignInHandler}>
            Go To Sign In
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UnautorizeDialog;
