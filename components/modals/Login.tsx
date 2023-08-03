import { useState, useEffect } from "react";
import { authModalState } from "@/atoms/authModalAtom";
import { auth } from "@/firebase/firebase";
import React from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useSetRecoilState } from "recoil";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
type Props = {};

const Login = (props: Props) => {
	const setAuthModalState = useSetRecoilState(authModalState);
	const router = useRouter();

	const handleClick = (type: "login" | "register" | "forgotPassword") => {
		setAuthModalState((prev) => ({ ...prev, type }));
	};

	const [inputs, setInputs] = useState({
		email: "",
		password: "",
	});

	const [signInWithEmailAndPassword, user, loading, error] = useSignInWithEmailAndPassword(auth);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!inputs.email || !inputs.password) return alert("Please fill all the fields!");

		try {
			const newUser = await signInWithEmailAndPassword(inputs.email, inputs.password);
			if (!newUser) return;
			router.push("/");
		} catch (err: any) {
			toast.error(err.message, { position: "top-right", theme: "dark", autoClose: 5000 });
		}
	};

	useEffect(() => {
		if (error) {
			toast.error(error.message, { position: "top-right", theme: "dark", autoClose: 5000 });
		}
	}, [error]);

	return (
		<form className="space-y-6 px-6 pb-8 pt-2" onSubmit={handleLogin}>
			<h3 className="text-xl font-medium text-white">Sign in to CodeOn</h3>
			<div>
				<label htmlFor="email" className="text-sm font-medium block mb-3 text-gray-300">
					Your Email
				</label>
				<input
					type="email"
					name="email"
					id="email"
					onChange={handleInputChange}
					className="border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
					placeholder="name@company.com"
				/>
			</div>
			<div>
				<label htmlFor="password" className="text-sm font-medium block mb-3 text-gray-300">
					Your Password
				</label>
				<input
					type="password"
					name="password"
					id="password"
					onChange={handleInputChange}
					className="border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
					placeholder="********"
				/>
			</div>
			<button
				type="submit"
				className="mt-12 w-full text-white focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-brand-orange hover:bg-brand-orange-s transition-colors duration-150 ease-in">
				{loading ? "Loading..." : "Login"}
			</button>
			<button className="flex w-full justify-end" onClick={() => handleClick("forgotPassword")}>
				<a href="#" className="text-sm block text-brand-orange hover:underline w-full text-right">
					Forgot Password?
				</a>
			</button>
			<div className="text-sm font-medium text-gray-300">
				Not Registered?{" "}
				<a href="#" className="text-blue-700 hover:underline" onClick={() => handleClick("register")}>
					Create account
				</a>
			</div>
		</form>
	);
};

export default Login;
