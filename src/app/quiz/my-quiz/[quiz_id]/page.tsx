"use client";

import { Button } from "@/components/ui/button";
import { getExamsByUserId } from "@/lib/redux/slice/examsSlice";
import { AppDispatch, RootState } from "@/lib/redux/store";
import { ArrowLeft } from "lucide-react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { SplitedExamsInterface } from "../page";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

const Page = () => {
  const { quiz_id } = useParams();
  const router = useRouter();

  const searchParams = useSearchParams();
  const type = searchParams.get("type");

  // get exams data
  const { data: examsData, isLoading } = useSelector(
    (state: RootState) => state.exams
  );
  const dispatch = useDispatch<AppDispatch>();

  const splitedExamData = examsData as unknown as SplitedExamsInterface;

  const handleGetExams = async () => {
    const res = await dispatch(getExamsByUserId());
    if (!getExamsByUserId.fulfilled.match(res)) {
      toast.error("somethink wrong");
    }
  };

  useEffect(() => {
    handleGetExams();
  }, [type]);
  // get exams data

  return (
    <section className="space-y-4">
      <Link href={"/quiz/my-quiz"} className="flex items-center gap-2">
        <ArrowLeft />
        Exams List
      </Link>
      <hr />
      {isLoading ? (
        <section className="grid grid-cols-12 gap-4">
          <Skeleton className="col-span-8 min-h-[100px] bg-white/70 backdrop-blur-sm" />
          <Skeleton className="col-span-4 min-h-[100px] bg-white/70 backdrop-blur-sm" />
        </section>
      ) : (
        <section className="grid grid-cols-12 gap-4">
          <div className="col-span-8 bg-white/70 backdrop-blur-sm p-4 rounded-lg shadow-md">
            {type == "reading" ? (
              <div className="space-y-3">
                <p className="">
                  Selamat datang di bagian Reading pada ujian TOEFL. Bagian ini
                  bertujuan untuk mengukur kemampuan Anda dalam memahami teks
                  bacaan akademik berbahasa Inggris.
                </p>
                <p>Agar ujian berjalan lancar, perhatikan tata cara berikut:</p>
                <ol className="list-decimal list-outside pl-4">
                  <li className="list-item">Bacalah teks dengan seksama</li>
                  <li className="list-item">
                    Kerjakan soal sesuai teks bacaan
                  </li>
                  <li className="list-item">
                    Perhatikan sisa waktu pengerjaan
                  </li>
                </ol>
                <p>Semangat Mengerjakan</p>
              </div>
            ) : type == "structure" ? (
              <div className="space-y-3">
                <p>
                  Selamat datang di bagian Structure and Written Expression pada
                  ujian TOEFL. Bagian ini bertujuan untuk mengukur kemampuan
                  Anda dalam memahami tata bahasa (grammar) dan struktur kalimat
                  dalam bahasa Inggris.
                </p>
                <p>Agar ujian berjalan lancar, perhatikan tata cara berikut:</p>
                <ol className="list-decimal list-outside pl-4">
                  <li className="list-item">
                    Bacalah setiap soal dengan cermat, perhatikan struktur
                    kalimatnya.
                  </li>
                  <li className="list-item">
                    Pilih jawaban yang secara tata bahasa paling tepat dan
                    sesuai konteks kalimat.
                  </li>
                  <li className="list-item">
                    Perhatikan pola soal: melengkapi kalimat (Structure) atau
                    menemukan kesalahan (Written Expression).
                  </li>
                  <li className="list-item">
                    Atur waktu pengerjaan agar dapat menjawab semua soal dengan
                    tenang.
                  </li>
                </ol>
                <p>Semangat Mengerjakan</p>
              </div>
            ) : (
              <div className="space-y-3">
                <p>
                  Selamat datang di bagian Listening pada ujian TOEFL. Bagian
                  ini bertujuan untuk mengukur kemampuan Anda dalam memahami
                  percakapan dan ceramah dalam bahasa Inggris akademik.
                </p>
                <p>Agar ujian berjalan lancar, perhatikan tata cara berikut:</p>
                <ol className="list-decimal list-outside pl-4">
                  <li className="list-item">
                    Dengarkan setiap percakapan atau ceramah dengan fokus dan
                    tanpa gangguan.
                  </li>
                  <li className="list-item">
                    Perhatikan ide utama, informasi detail, serta sikap dan
                    maksud pembicara.
                  </li>
                  <li className="list-item">
                    Jawablah soal segera setelah audio selesai diputar,
                    berdasarkan informasi yang didengar.
                  </li>
                  <li className="list-item">
                    Perhatikan sisa waktu pengerjaan untuk memastikan semua soal
                    terjawab.
                  </li>
                </ol>
                <p>Semangat Mengerjakan</p>
              </div>
            )}
          </div>
          <div className="col-span-4 flex flex-col justify-between bg-white/70 backdrop-blur-sm p-4 rounded-lg shadow-md space-y-4">
            <div className="grid grid-cols-2 gap-1 text-sm">
              <div>Duration</div>
              <div className="text-end font-bold">{"60"} min</div>
              <div>Total Question</div>
              <div className="text-end font-bold">
                {splitedExamData?.reading?.length || "0"}
              </div>
              <div>Type</div>
              <div className="text-end font-bold capitalize">{type}</div>
            </div>

            <hr className="bg-black" />

            <div className="text-sm space-y-2">
              <h3 className="font-semibold text-base">📝 Rules Ujian</h3>
              <ul className="list-disc list-outside pl-4 space-y-1">
                <li className="list-item">
                  Kerjakan soal sesuai instruksi dengan cermat.
                </li>
                <li className="list-item">
                  Pastikan membaca setiap teks atau soal secara teliti.
                </li>
                <li className="list-item">
                  Manfaatkan waktu dengan baik, perhatikan sisa durasi ujian.
                </li>
                <li className="list-item">
                  Dilarang menggunakan bantuan dari luar selama ujian
                  berlangsung.
                </li>
                <li className="list-item">
                  Setelah memulai, waktu akan berjalan otomatis hingga selesai.
                </li>
              </ul>
            </div>

            <div className="pt-8">
              <Button
                className="w-full bg-blue-600 font-bold"
                onClick={() =>
                  router.push(`/quiz/my-quiz/${quiz_id}/begin?type=${type}`)
                }
              >
                Start
              </Button>
            </div>
          </div>
        </section>
      )}
    </section>
  );
};

export default Page;
