"use client";
import React, { useState, useEffect } from "react";
import Navbar from "@/components/navbar/Navbar";
import AuthModal from "@/components/modals/AuthModal";
import { authModalState } from "@/atoms/authModalAtom";
import { useRecoilValue } from "recoil";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/firebase";
import { useRouter } from "next/navigation";
import Image from "next/image";

type Props = {};

const AuthPage = (props: Props) => {
	const authModal = useRecoilValue(authModalState);
	const [user, loading, error] = useAuthState(auth);
	const [pageLoading, setPageLoading] = useState(true);
	const router = useRouter();

	useEffect(() => {
		if (user) router.push("/");
		if (!loading && !user) setPageLoading(false);
	}, [user, router, loading]);

	if (pageLoading) return null;

	return (
		<div className="bg-gradient-to-b from-blue-950 to to-cyan-950 h-screen relative">
			<div className="max-w-7xl mx-auto">
				<Navbar />
				<div className="flex items-center justify-center h-[calc(100vh-5rem)] pointer-events-none select-none">
					<Image src="/assets/hero.png" width={700} height={700} alt="hero image" />
				</div>
				{authModal.isOpen && <AuthModal />}
			</div>
		</div>
	);
};

export default AuthPage;
