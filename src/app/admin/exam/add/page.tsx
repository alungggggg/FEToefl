"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ExamSchema } from "@/lib/schema";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, CalendarIcon, PlusIcon } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/redux/store";
import { addExams } from "@/lib/redux/slice/examsSlice";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const AddExams = () => {
  const form = useForm<z.infer<typeof ExamSchema>>({
    defaultValues: {
      name: "",
      access: "",
      expired: "",
    },
    resolver: zodResolver(ExamSchema),
  });

  const dispatch = useDispatch<AppDispatch>();
  const { isLoading } = useSelector((state: RootState) => state.exams);

  const router = useRouter();

  async function handleAddExams(data: z.infer<typeof ExamSchema>) {
    const res = await dispatch(addExams(data));
    console.log(res);
    if (addExams.fulfilled.match(res)) {
      toast.success("Successfully add exams");
      router.push("/admin/exam");
    } else {
      toast.error("Failed to add exams");
    }
  }

  return (
    <section>
      <div className="flex justify-between items-center">
        <Link href={"/admin/exam"} className="flex items-center gap-2">
          <ArrowLeft />
          Add Exams
        </Link>
        <Button
          className="bg-[#1E56A0]"
          disabled={isLoading}
          onClick={() => document.getElementById("submitExams")?.click()}
        >
          <PlusIcon /> Add Data
        </Button>
      </div>
      <hr className="my-3" />
      <Form {...form}>
        <form
          action=""
          className="space-y-4"
          onSubmit={form.handleSubmit((data) => handleAddExams(data))}
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Exams Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Lorem ipsum ......" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="access"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1">
                <FormLabel>Access Code</FormLabel>
                <FormControl>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[280px] justify-start text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value ? (
                          format(field.value, "yyyy-MM-dd HH:mm:ss")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        // selected={field.value}
                        onSelect={(date) => {
                          field.onChange(
                            date ? format(date, "yyyy-MM-dd HH:mm:ss") : ""
                          );
                        }}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="expired"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1">
                <FormLabel>Access Code</FormLabel>
                <FormControl>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[280px] justify-start text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value ? (
                          format(field.value, "yyyy-MM-dd HH:mm:ss")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        // selected={field.value}
                        onSelect={(date) => {
                          field.onChange(
                            date ? format(date, "yyyy-MM-dd HH:mm:ss") : ""
                          );
                        }}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <button id="submitExams" className="hidden"></button>
        </form>
      </Form>
    </section>
  );
};

export default AddExams;
