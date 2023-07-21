import React from "react";
import Navbar from "@/components/navbar/Navbar";
import AuthModal from "@/components/models/AuthModal";

type Props = {};

const AuthPage = (props: Props) => {
	return (
		<div className="bg-gradient-to-b from-blue-950 to to-cyan-950 h-screen relative">
			<div className="max-w-7xl mx-auto">
				<Navbar />
				<div className="flex items-center justify-center h-[calc(100vh-5rem)] pointer-events-none select-none">
					<img src="/assets/hero.png" alt="hero image" />
				</div>
				<AuthModal />
			</div>
		</div>
	);
};

export default AuthPage;
