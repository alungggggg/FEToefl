"use client";

import { getCookie } from "@/lib/fetchingCookie";
import LoginForm from "@/app/login/_components/loginForm";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const PageLogin = () => {
  const [isChecking, setIsChecking] = useState<boolean>(true);
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    async function handleGetCookie() {
      const { value: token } = await getCookie();
      if (token) {
        setIsLogin(true);
        router.replace("/admin"); // ✅ Langsung redirect jika sudah login
      }
      setIsChecking(false); // ✅ Tandai bahwa validasi selesai
    }
    handleGetCookie();
  }, [router]);

  // ✅ Jika masih mengecek, tampilkan loading screen
  if (isChecking) {
    return (
      <section className="h-screen w-screen flex items-center justify-center bg-white">
        <p className="text-lg font-semibold text-gray-700">
          Memeriksa autentikasi...
        </p>
      </section>
    );
  }

  if (isLogin) {
    return <div></div>;
  }

  return (
    <div className="flex justify-center items-center h-screen bg-[url('/background/signup-bg.jpg')] bg-cover">
      <div className="flex justify-center items-center h-screen bg-white/10 backdrop-blur-sm w-full bg-blur">
        <LoginForm />
      </div>
    </div>
  );
};

export default PageLogin;
