"use client";

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
import { Textarea } from "@/components/ui/textarea";
import { addReadingQuestion } from "@/lib/redux/slice/readingQuestionSlice";
import { AppDispatch, RootState } from "@/lib/redux/store";
import { QuestionSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, PlusIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { z } from "zod";

const AddReadingQuestion = () => {
  const { isLoading } = useSelector(
    (state: RootState) => state.readingQuestion
  );
  const dispatch  = useDispatch<AppDispatch>()
  const router = useRouter()

  const form = useForm<z.infer<typeof QuestionSchema>>({
    defaultValues: {
      type: "reading",
      question: "",
      answer: "",
      options: [
        {
          options: "",
        },
        {
          options: "",
        },
        {
          options: "",
        },
        {
          options: "",
        },
      ],
    },
    resolver: zodResolver(QuestionSchema),
  });

  async function handleAddReadingQuestion(data : z.infer<typeof QuestionSchema>) {
    const res = await dispatch(addReadingQuestion(data));
    console.log(res)
    if (addReadingQuestion.fulfilled.match(res)) {
      toast.success("Successfully add reading question");
      router.push("/admin/question/reading");
    } else {
      toast.error("Something went wrong");
    }
  }

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <Link className="flex gap-3" href={"./"}>
          <ArrowLeft />
          Add Reading Question
        </Link>
        <Button
          className="bg-blue-500 hover:bg-blue-600 text-white"
          onClick={() => {
            document.getElementById("submitReadingQuestion")?.click();
          }}
          disabled={isLoading}
        >
          <PlusIcon /> Add Question
        </Button>
      </div>
      <hr className="w-full" />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((e) => handleAddReadingQuestion(e))}
          className="space-y-4"
        >
          <FormField
            control={form.control}
            name="question"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Question</FormLabel>
                <FormControl>
                  <Textarea
                    rows={6}
                    {...field}
                    placeholder="Lorem ipsum ......"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Lorem ipsum"
                    value={field.value}
                    disabled
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="answer"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Answer</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Lorem ipsum" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="weight"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Weight</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="10" type="number" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-2 gap-4">
            {form.watch("options").map((option, index) => (
              <FormField
                key={index}
                control={form.control}
                name={`options.${index}.options`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{`Option ${index + 1}`}</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Lorem ipsum" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
          </div>
          <button
            type="submit"
            className="d-none"
            id="submitReadingQuestion"
          ></button>
        </form>
      </Form>
    </div>
  );
};

export default AddReadingQuestion;
