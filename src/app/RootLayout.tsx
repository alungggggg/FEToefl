"use client";

import store from "@/lib/redux/store";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";

export default function RootLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      {children}
      <ToastContainer position="bottom-right" />
    </Provider>
  );
}
