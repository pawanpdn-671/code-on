"use client";
import Topbar from "@/components/topbar/Topbar";
import Workspace from "@/components/workspace/Workspace";
import { problems } from "@/utils/problems";
import { Problem } from "@/utils/types/problem";
import React from "react";

const fetchData = (pid: string) => {
	const res = problems[pid];
	return res;
};

const ProblemPage = ({ params }: { params: { pid: string } }) => {
	const { pid } = params;
	let data = fetchData(pid);
	return (
		<div>
			<Topbar problemPage />
			<Workspace problem={data} />
		</div>
	);
};

export default ProblemPage;
