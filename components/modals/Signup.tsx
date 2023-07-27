import React, { useState, useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { authModalState } from "@/atoms/authModalAtom";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/firebase";
import { useRouter } from "next/navigation";

type Props = {};

const Signup = (props: Props) => {
	const setAuthModalState = useSetRecoilState(authModalState);
	const handleClick = (type: "login" | "register" | "forgotPassword") => {
		setAuthModalState((prev) => ({ ...prev, type }));
	};

	const [inputs, setInputs] = useState({
		email: "",
		displayName: "",
		password: "",
	});
	const router = useRouter();

	const [createUserWithEmailAndPassword, user, loading, error] = useCreateUserWithEmailAndPassword(auth);

	const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!inputs.email || !inputs.password || !inputs.displayName) {
			return alert("Please fill all the fields!");
		}
		try {
			const newUser = await createUserWithEmailAndPassword(inputs.email, inputs.password);
			if (!newUser) return;
			router.push("/");
		} catch (error: any) {
			alert(error.message);
		}
	};

	useEffect(() => {
		if (error) alert(error?.message);
	}, [error]);

	return (
		<form className="space-y-6 px-6 pb-8 pt-2" onSubmit={handleRegister}>
			<h3 className="text-xl font-medium text-white">Register to CodeOn</h3>
			<div>
				<label htmlFor="email" className="text-sm font-medium block mb-3 text-gray-300">
					Email
				</label>
				<input
					type="email"
					name="email"
					id="email"
					onChange={handleChangeInput}
					className="border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
					placeholder="name@company.com"
				/>
			</div>
			<div>
				<label htmlFor="displayName" className="text-sm font-medium block mb-3 text-gray-300">
					Display Name
				</label>
				<input
					type="displayName"
					name="displayName"
					id="displayName"
					onChange={handleChangeInput}
					className="border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
					placeholder="Pawan Pradhan"
				/>
			</div>
			<div>
				<label htmlFor="password" className="text-sm font-medium block mb-3 text-gray-300">
					Password
				</label>
				<input
					type="password"
					name="password"
					id="password"
					onChange={handleChangeInput}
					className="border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
					placeholder="********"
				/>
			</div>
			<button
				type="submit"
				className="mt-12 w-full text-white focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-brand-orange hover:bg-brand-orange-s transition-colors duration-150 ease-in">
				{loading ? "Registering..." : "Register"}
			</button>
			<div className="text-sm font-medium text-gray-300">
				Already have an account?{" "}
				<a href="#" className="text-blue-700 hover:underline" onClick={() => handleClick("login")}>
					Login
				</a>
			</div>
		</form>
	);
};

export default Signup;
