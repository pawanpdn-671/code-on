import React from "react";
import Navbar from "@/components/navbar/Navbar";

type Props = {};

const AuthPage = (props: Props) => {
	return (
		<div className="bg-gradient-to-b from-blue-950 to to-cyan-950 h-screen relative">
			<div className="max-w-7xl mx-auto">
				<Navbar />
			</div>
		</div>
	);
};

export default AuthPage;
