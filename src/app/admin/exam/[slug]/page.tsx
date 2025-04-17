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
import { AppDispatch, RootState } from "@/lib/redux/store";
import { ExamSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowLeft,
  CalendarIcon,
  PlusIcon,
  UsersRoundIcon,
} from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import SelectedQuestionDialog from "./_components/selectQuestDialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { editExams, getExamsById } from "@/lib/redux/slice/examsSlice";

const EditExams = () => {
  const { slug } = useParams();

  const extendedExamSchema = ExamSchema.extend({
    uuid: z.string(),
    bundler: z.array(
      z.object({
        id_exam: z.string(),
        id_quest: z.string(),
      })
    ),
  });

  const form = useForm<z.infer<typeof extendedExamSchema>>({
    defaultValues: {
      name: "",
      access: "",
      expired: "",
    },
    resolver: zodResolver(extendedExamSchema),
  });

  const dispatch = useDispatch<AppDispatch>();

  const router = useRouter();

  //dialog state
  const [selectedBundler, setSelectedBundler] = useState<
    Array<{ id_exam: string; id_quest: string; question?: string }>
  >([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  //dialog state

  //get exams by id state
  const { data: examData, isLoading } = useSelector(
    (state: RootState) => state.exams
  );
  const { data: questionData } = useSelector(
    (state: RootState) => state.question
  );

  async function handleGetExamById() {
    const res = await dispatch(getExamsById(slug as string));
    if (!getExamsById.fulfilled.match(res)) {
      console.log("success", res.payload);
    }
  }

  useEffect(() => {
    handleGetExamById();
  }, []);
  //get exams by id state

  useEffect(() => {
    form.reset({
      uuid: examData[0]?.uuid,
      name: examData[0]?.name,
      access: examData[0]?.access,
      expired: examData[0]?.expired,
      bundler: examData[0]?.quest || [],
    });
    setSelectedBundler(examData[0]?.quest || []);
  }, [examData ]);

  useEffect(() => {
    form.setValue("bundler", selectedBundler);
  }, [selectedBundler]);

  //handle submit
  async function handleSubmit(data: z.infer<typeof extendedExamSchema>) {
    const res = await dispatch(editExams(data));
    console.log("res", res);
    if (!getExamsById.fulfilled.match(res)) {
      console.log("success", res.payload);
    }
    router.push("/admin/exam");
  }

  //handle submit

  console.log(examData)

  return (
    <section>
      <div className="flex items-center justify-between">
        <Link href={`/admin/exam/`} className="flex items-center gap-2">
          <ArrowLeft />
          Edit Exams
        </Link>
        <Button
          className="bg-[#1E56A0]"
          onClick={() => {
            document.getElementById("submitEditExams")?.click();
          }}
          disabled={isLoading}
        >
          <PlusIcon />
          Add Exam
        </Button>
      </div>
      <hr className="my-3" />
      <Form {...form}>
        <form
          action=""
          className="space-y-4"
          onSubmit={form.handleSubmit((data) => handleSubmit(data))}
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
          <button id="submitEditExams" className="hidden"></button>
          <section className="space-y-3 mt-5">
            <Button
              className="w-full"
              onClick={() => setIsOpen(true)}
              type="button"
            >
              <PlusIcon /> Add Question
            </Button>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Question</TableHead>
                  <TableHead className="w-6">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {selectedBundler?.map((item, i) => (
                  <TableRow key={i}>
                    <TableCell className="truncate">
                      {
                        item?.question || "Question not found"
                      }
                    </TableCell>
                    <TableCell>
                      <Button className="bg-[#1E56A0]" size={"sm"}>
                        <PlusIcon />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </section>
        </form>
      </Form>
      <SelectedQuestionDialog
        selectedQuestion={selectedBundler}
        setSelectedQuestion={setSelectedBundler}
        isOpen={isOpen}
        exams_id={examData[0]?.uuid}
        setIsOpen={setIsOpen}
      />
    </section>
  );
};

export default EditExams;
