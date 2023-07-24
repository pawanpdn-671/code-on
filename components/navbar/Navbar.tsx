"use client";
import { authModalState } from "@/atoms/authModalAtom";
import Link from "next/link";
import React from "react";
import { useSetRecoilState } from "recoil";

type Props = {};

function Navbar({}: Props) {
	const setAuthModalState = useSetRecoilState(authModalState);
	const handleClick = () => {
		setAuthModalState((prev) => ({ ...prev, isOpen: true }));
	};

	return (
		<div className="flex items-center justify-between sm:px-12 px-2 ml:px-24">
			<Link href="/" className="flex items-center justify-center h-20">
				<img src="/assets/logo.png" alt="code on" className="h-[32px]" />
			</Link>
			<div className="flex items-center">
				<button
					className="bg-brand-orange text-white px-2 py-1 sm:px-4 rounded-md text-sm font-medium hover:text-brand-orange hover:bg-white border-2 border-brand-orange transition-colors duration-150 ease-in"
					onClick={handleClick}>
					Sign in
				</button>
			</div>
		</div>
	);
}

export default Navbar;
