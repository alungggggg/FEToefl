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
import { addFileQuestion } from "@/lib/redux/slice/questionSlice";
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

const AddListeningQuestion = () => {
  const { isLoading } = useSelector((state: RootState) => state.question);
  const dispatch = useDispatch<AppDispatch>();
  const route = useRouter();

  // delete question from schema
  const fileQuestionSchema = QuestionSchema.omit({
    question: true,
  }).extend({
    question: z.instanceof(File).refine((file) => file.size > 0, {
      message: "File is required",
    }),
  });

  const form = useForm<z.infer<typeof fileQuestionSchema>>({
    defaultValues: {
      type: "listening",
      weight: "",
      answer: "",
      question: undefined,
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
    resolver: zodResolver(fileQuestionSchema),
  });

  async function handleaddQuestion(data: z.infer<typeof fileQuestionSchema>) {
    const res = await dispatch(addFileQuestion(data));
    console.log("res", res);
    if (addFileQuestion.fulfilled.match(res)) {
      route.push("/admin/question/listening");
      toast.success("Question added successfully");
    } else {
      console.log("error", res.payload);
    }
  }
  return (
    <section>
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <Link className="flex gap-3" href={"./"}>
            <ArrowLeft />
            Add Listening Question
          </Link>
          <Button
            className="bg-blue-500 hover:bg-blue-600 text-white"
            onClick={() => {
              document.getElementById("submitListeningQuestion")?.click();
            }}
            disabled={isLoading}
          >
            <PlusIcon /> Add Question
          </Button>
        </div>
        <hr className="w-full" />
        <Form {...form}>
          <form
            id="submitReadingQuestion"
            onSubmit={form.handleSubmit((e) => handleaddQuestion(e))}
            className="space-y-3"
          >
            <FormField
              control={form.control}
              name="question"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Question</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept="audio/*,video/*"
                      onChange={(e) => {
                        field.onChange(e.target.files?.[0]);
                      }}
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
                      placeholder="Lorem ipsum ......"
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
                    <Input {...field} placeholder="Lorem ipsum ......" />
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
                    <Input {...field} placeholder="Lorem ipsum ......" />
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
            <Button
              type="submit"
              id="submitListeningQuestion"
              className="hidden"
            />
          </form>
        </Form>
      </div>
    </section>
  );
};

export default AddListeningQuestion;
