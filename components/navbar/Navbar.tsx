import Link from "next/link";
import React from "react";

type Props = {};

function Navbar({}: Props) {
	return (
		<div className="flex items-center justify-between sm:px-12 px-2 ml:px-24">
			<Link
				href="/"
				className="flex items-center justify-center h-20">
				<img
					src="/assets/logo.png"
					alt="code on"
					className="h-full"
				/>
			</Link>
			<div className="flex items-center">
				<button>Sign in</button>
			</div>
		</div>
	);
}

export default Navbar;
