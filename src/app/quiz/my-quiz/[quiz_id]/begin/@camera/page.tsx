"use client";

import { useEffect, useRef, useState } from "react";

export default function CameraLive() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
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
      });
  }, []);

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
          className="w-full h-full rounded-lg bg-black"
        />
      )}
    </div>
  );
}
