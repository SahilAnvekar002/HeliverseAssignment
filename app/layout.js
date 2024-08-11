import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import AddComponent from "@/components/AddComponent";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "E Classroom - Dashboard",
  description: "E-Classroom is a web application which contains users such as principal, teacher and student. It provides various functionalities such as classroom creation, timetable creation and so on.",
};

export default function RootLayout({ children }) {
 
  return (
    <html lang="en">
      <body className={inter.className}>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
        <Sidebar />
        {children}
      </body>
    </html>
  );
}
