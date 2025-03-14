import LoginForm from "@/pages/login/loginForm";

const PageLogin = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-[url('/background/signup-bg.jpg')] bg-cover">
      <div className="flex justify-center items-center h-screen bg-white/10 backdrop-blur-sm w-full bg-blur">
        <LoginForm />
      </div>
    </div>
  );
};

export default PageLogin;
