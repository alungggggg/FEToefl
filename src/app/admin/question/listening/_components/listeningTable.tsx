"use client";

import { useEffect, useRef, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SquarePen, Trash, Play, Pause, Volume2, EyeIcon } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { QuestionInterface } from "@/lib/interface";

const tHeadItems = ["No", "Question", "Answer", "Audio", "Weight", "Action"];

const formatTime = (seconds: number) => {
  const min = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60);
  return `${min}:${sec < 10 ? "0" : ""}${sec}`;
};

const ListeningTable = ({
  questionData,
  setIsOpen,
  setDialogAction,
  setSelectedQuestion,
}: {
  setIsOpen: (isOpen: boolean) => void;
  setDialogAction: (dialogAction: string) => void;
  setSelectedQuestion: (selectedQuestion: QuestionInterface) => void;
  questionData: QuestionInterface[];
}) => {
  const [activeAudioId, setActiveAudioId] = useState<number | null>(null);
  const [progress, setProgress] = useState<{ [key: number]: number }>({});
  const [durations, setDurations] = useState<{ [key: number]: number }>({});
  const audioRefs = useRef<{ [key: number]: HTMLAudioElement | null }>({});

  useEffect(() => {
    Object.values(audioRefs.current).forEach((audio) => {
      if (audio) {
        audio.addEventListener("ended", () => {
          setActiveAudioId(null);
        });
      }
    });
  }, []);

  const togglePlay = (id: number) => {
    const currentAudio = audioRefs.current[id];

    if (!currentAudio) return;

    if (activeAudioId === id) {
      if (currentAudio.paused) {
        currentAudio.play();
      } else {
        currentAudio.pause();
      }
    } else {
      Object.values(audioRefs.current).forEach((audio) => {
        if (audio && !audio.paused) {
          audio.pause();
        }
      });

      currentAudio.currentTime = 0;
      currentAudio.play();
      setActiveAudioId(id);
    }
  };

  const handleSeek = (id: number, value: number[]) => {
    const currentAudio = audioRefs.current[id];

    // ✅ Periksa apakah audio sudah tersedia sebelum mengubah currentTime
    if (currentAudio) {
      currentAudio.currentTime = value[0];
      setProgress((prev) => ({ ...prev, [id]: value[0] }));
    }
  };

  return (
    <Table>
      <TableHeader className="bg-[#1E56A0] text-white">
        <TableRow>
          {tHeadItems.map((item) => (
            <TableHead
              key={item}
              className={`text-white ${
                item.toLowerCase() === "no"
                  ? "w-[40px]"
                  : item.toLowerCase() === "action"
                  ? "w-[80px]"
                  : ""
              }`}
            >
              {item}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {questionData.map((row, index) => (
          <TableRow key={index}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{"Listen carefully to answer the question !"}</TableCell>
            <TableCell>{row.answer}</TableCell>
            <TableCell>
              <div className="flex items-center gap-2 w-full p-2 bg-gray-100 rounded-lg">
                <audio
                  ref={(el) => {
                    if (el) audioRefs.current[index] = el;
                  }}
                  src={`${process.env.NEXT_PUBLIC_AUDIO_URL}${row.question}`}
                  onTimeUpdate={(e) => {
                    const audio = e.currentTarget;
                    setProgress((prev) => ({
                      ...prev,
                      [index]: audio?.currentTime || 0, // ✅ Gunakan optional chaining
                    }));
                  }}
                  onLoadedMetadata={(e) => {
                    const audio = e.currentTarget;
                    setDurations((prev) => ({
                      ...prev,
                      [index]: audio?.duration || 0, // ✅ Gunakan optional chaining
                    }));
                  }}
                />
                <button onClick={() => togglePlay(index)} className="p-2">
                  {activeAudioId === index &&
                  audioRefs.current[index]?.paused === false ? (
                    <Pause size={20} />
                  ) : (
                    <Play size={20} />
                  )}
                </button>
                <span className="text-sm">
                  {formatTime(progress[index] || 0)} /{" "}
                  {formatTime(durations[index] || 0)}
                </span>
                <Slider
                  value={[progress[index] || 0]}
                  max={durations[index] || 1}
                  onValueChange={(value) => handleSeek(index, value)}
                  className="w-20"
                />
                <Volume2 size={18} />
              </div>
            </TableCell>
            <TableCell>{row.weight}</TableCell>
            <TableCell>
              <div className="flex z-10 h-full items-center justify-center gap-1">
                <EyeIcon
                  onClick={() => {
                    setIsOpen(true);
                    setDialogAction("view");
                    setSelectedQuestion(row);
                  }}
                />
                <SquarePen />
                <Trash
                  onClick={() => {
                    setIsOpen(true);
                    setDialogAction("delete");
                    setSelectedQuestion(row);
                  }}
                />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ListeningTable;
