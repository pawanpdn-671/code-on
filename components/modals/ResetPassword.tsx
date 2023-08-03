"use client";
import { auth } from "@/firebase/firebase";
import React, { useEffect, useState } from "react";
import { useSendPasswordResetEmail } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";

type Props = {};

const ResetPassword = (props: Props) => {
	const [email, setEmail] = useState("");
	const [sendPasswordResetEmail, sending, error] = useSendPasswordResetEmail(auth);

	const handleReset = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const success = await sendPasswordResetEmail(email);
		if (success) {
			toast.success("Email sent successfully!", { position: "top-right", autoClose: 5000, theme: "dark" });
		}
	};

	useEffect(() => {
		if (error) {
			toast.error(error.message, {
				position: "top-right",
				theme: "dark",
				autoClose: 5000,
			});
		}
	}, [error]);

	return (
		<form className="space-y-6 px-6 pb-8 pt-2" onSubmit={handleReset}>
			<h3 className="text-xl font-medium text-white">Reset Your Password</h3>
			<p className="text-sm text-white">
				Forgotten your password? Enter your e-mail address below, and we will send you an e-mail allowing you to
				reset it.
			</p>
			<div>
				<label htmlFor="email" className="text-sm font-medium block mb-3 text-gray-300">
					Your Email
				</label>
				<input
					type="email"
					name="email"
					id="email"
					onChange={(e) => setEmail(e.target.value)}
					className="border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
					placeholder="name@company.com"
				/>
			</div>

			<button
				type="submit"
				className="mt-12 w-full text-white focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-brand-orange hover:bg-brand-orange-s transition-colors duration-150 ease-in">
				Reset Password
			</button>
		</form>
	);
};

export default ResetPassword;
