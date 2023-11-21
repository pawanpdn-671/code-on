"use client";
import "./globals.css";
import type { Metadata } from "next";
import { RecoilRoot } from "recoil";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body>
				<RecoilRoot>{children}</RecoilRoot>
				<ToastContainer />
			</body>
		</html>
	);
}
