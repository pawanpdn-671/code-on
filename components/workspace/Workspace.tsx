"use client";
import React, { useState } from "react";
import Split from "react-split";
import ProblemDescription from "./problemDescription/ProblemDescription";
import Playground from "./playground/Playground";
import { Problem } from "@/utils/types/problem";
import Confetti from "react-confetti";
import useWindowSize from "@/hooks/useWindowSIze";

type WorkspaceProps = {
	problem: Problem;
};

const Workspace = ({ problem }: WorkspaceProps) => {
	const { height, width } = useWindowSize();
	const [success, setSuccess] = useState(false);
	const [solved, setSolved] = useState(false);

	return (
		<Split className="split">
			<ProblemDescription problem={problem} _solved={solved} />
			<div className="bg-dark-fill-2">
				<Playground problem={problem} setSuccess={setSuccess} setSolved={setSolved} />
				{success && <Confetti width={width - 1} height={height - 1} gravity={0.3} tweenDuration={4000} />}
			</div>
		</Split>
	);
};

export default Workspace;
