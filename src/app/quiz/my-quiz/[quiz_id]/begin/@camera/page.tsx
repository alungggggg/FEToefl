"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import CameraDialog from "./_components/cameraDialog";
import { toast } from "react-toastify";

export default function CameraLive() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleStartCamera = useCallback(() => {
    setIsLoading(true);
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;

          videoRef.current.play().catch((err) => {
            console.error("Gagal memulai video:", err);
          });

          videoRef.current.focus(); // ⬅️ Auto focus ke video
        }

        setError(null); // Kamera berhasil, hapus error

        // ✅ Tampilkan toast success
        toast.success("Kamera berhasil diakses.");
      })
      .catch((err) => {
        console.error("Kamera tidak bisa diakses:", err);
        if (err.name === "NotAllowedError") {
          setError("Akses kamera ditolak. Mohon izinkan akses kamera.");
        } else if (err.name === "NotFoundError") {
          setError("Tidak ditemukan perangkat kamera.");
        } else {
          setError("Terjadi kesalahan saat mengakses kamera.");
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [toast]);

  useEffect(() => {
    handleStartCamera();
  }, [handleStartCamera]);

  return (
    <div className="rounded-lg grid items-center">
      {error ? (
        <div className="text-red-600 font-semibold p-4 text-center">
          <p>{error}</p>
        </div>
      ) : (
        <video
          ref={videoRef}
          autoPlay
          tabIndex={-1} // ⬅️ Biar bisa di-focus
          className="w-full h-full rounded-lg bg-black"
        />
      )}

      <CameraDialog
        isShow={!!error}
        onRetry={handleStartCamera}
        isLoading={isLoading}
      />
    </div>
  );
}
