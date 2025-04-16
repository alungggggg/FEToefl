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
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import {
  editReadingQuestion,
  getReadingQuestionById,
} from "@/lib/redux/slice/readingQuestionSlice";
import { AppDispatch, RootState } from "@/lib/redux/store";
import { QuestionSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, PlusIcon } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { z } from "zod";

const EditReadingQuestion = () => {
  const { slug } = useParams();
  const { data: questionData, isLoading } = useSelector(
    (state: RootState) => state.readingQuestion
  );
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  async function handleGetReadingQuestionById() {
    const res = await dispatch(getReadingQuestionById(slug as string));
  }
  useEffect(() => {
    handleGetReadingQuestionById();
  }, [slug]);

  const ExtendedQuestionSchema = QuestionSchema.extend({
    uuid: z.string().nonempty(),
  });

  const form = useForm<z.infer<typeof ExtendedQuestionSchema>>({
    defaultValues: {
      uuid: "",
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
    resolver: zodResolver(
      QuestionSchema.extend({
        uuid: z.string().nonempty(),
      })
    ), // Use the extended schema for validation
  });

  async function handleEditReadingQuestion(
    data: z.infer<typeof ExtendedQuestionSchema>
  ) {
    const res = await dispatch(editReadingQuestion(data));
    console.log(res);
    if (editReadingQuestion.fulfilled.match(res)) {
      toast.success("Successfully edit reading question");
      router.push("/admin/question/reading");
    } else {
      toast.error("Something went wrong");
    }
  }

  useEffect(() => {
    if (questionData.length > 0) {
      form.reset({
        uuid: questionData[0]?.uuid,
        type: questionData[0]?.type,
        question: questionData[0]?.question,
        answer: questionData[0]?.answer,
        weight: questionData[0]?.weight.toString() || "",
        options: [
          {
            options: questionData[0]?.options[0]?.options || "",
          },
          {
            options: questionData[0]?.options[1]?.options || "",
          },
          {
            options: questionData[0]?.options[2]?.options || "",
          },
          {
            options: questionData[0]?.options[3]?.options || "",
          },
        ],
      });
    }
  }, [questionData, form]);

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <Link className="flex gap-3" href={"./"}>
          <ArrowLeft />
          Edit Reading Question
        </Link>
        <Button
          className="bg-blue-500 hover:bg-blue-600 text-white"
          onClick={() => {
            document.getElementById("submitReadingQuestion")?.click();
          }}
          disabled={isLoading}
        >
          <PlusIcon /> Edit Question
        </Button>
      </div>
      <hr className="w-full" />
      {isLoading ? (
        <div className="space-y-4">
          <Skeleton className="h-32" />
          <Skeleton className="h-9" />
          <Skeleton className="h-9" />
          <Skeleton className="h-9" />
          <div className="grid grid-cols-2 gap-4">
            <Skeleton className="h-9" />
            <Skeleton className="h-9" />
            <Skeleton className="h-9" />
            <Skeleton className="h-9" />
          </div>
        </div>
      ) : (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((e) => handleEditReadingQuestion(e))}
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
                      value={field.value}
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
                    <Input
                      {...field}
                      placeholder="Lorem ipsum"
                      value={field.value}
                    />
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
                    <Input
                      {...field}
                      type="text"
                      placeholder="Lorem ipsum"
                      value={field.value}
                    />
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
                        <Input
                          {...field}
                          placeholder="Lorem ipsum"
                          value={field.value}
                        />
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
      )}
    </div>
  );
};

export default EditReadingQuestion;
