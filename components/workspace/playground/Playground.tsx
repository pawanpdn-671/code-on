import React, { useState, useEffect } from "react";
import PreferenceNav from "./PreferenceNav";
import Split from "react-split";
import ReactCodeMirror from "@uiw/react-codemirror";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { javascript } from "@codemirror/lang-javascript";
import EditorFooter from "./EditorFooter";
import { Problem } from "@/utils/types/problem";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore } from "@/firebase/firebase";
import { toast } from "react-toastify";
import { useParams } from "next/navigation";
import { problems } from "@/utils/problems";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import useLocalStorage from "@/hooks/useLocalStorage";

type PlaygroundProps = {
	problem: Problem;
	setSuccess: React.Dispatch<React.SetStateAction<boolean>>;
	setSolved: React.Dispatch<React.SetStateAction<boolean>>;
};

export interface ISettings {
	fontSize: string;
	settingsModalOpen: boolean;
	dropdownOpen: boolean;
}

const Playground = ({ problem, setSuccess, setSolved }: PlaygroundProps) => {
	const [activeTestCaseId, setActiveTestCaseId] = useState<number>(0);
	let [userCode, setUserCode] = useState<string>(problem.starterCode);
	const [fontSize, setFontSize] = useLocalStorage("codeon-fontSize", "16px");
	const [settings, setSettings] = useState<ISettings>({
		fontSize: fontSize,
		settingsModalOpen: false,
		dropdownOpen: false,
	});

	const [user] = useAuthState(auth);
	const { pid } = useParams();

	const handleSubmit = async () => {
		if (!user) {
			toast.error("Please login to submit your code", {
				position: "top-center",
				autoClose: 3000,
				theme: "dark",
			});
			return;
		}
		try {
			userCode = userCode.slice(userCode.indexOf(problem.starterFunctionName));
			const callback = new Function(`return ${userCode}`)();
			const handler = problems[pid as string].handlerFunction;
			if (typeof handler === "function") {
				const success = handler(callback);
				if (success) {
					toast.success("Congrats! All tests passed!", {
						position: "top-center",
						autoClose: 3000,
						theme: "dark",
					});
					setSuccess(true);
					setTimeout(() => {
						setSuccess(false);
					}, 4000);

					const userRef = doc(firestore, "users", user.uid);
					await updateDoc(userRef, {
						solvedProblems: arrayUnion(pid),
					});
					setSolved(true);
				}
			}
		} catch (error: any) {
			if (error.message.startsWith("AssertionError [ERR_ASSERTION]: Expected values to be strictly deep-equal:")) {
				toast.error("Oops! One or more test cases failed!", {
					position: "top-center",
					autoClose: 3000,
					theme: "dark",
				});
			} else {
				toast.error(error.message, {
					position: "top-center",
					autoClose: 3000,
					theme: "dark",
				});
			}
		}
	};

	useEffect(() => {
		const code = localStorage.getItem(`code-${pid}`);
		if (user) {
			setUserCode(code ? JSON.parse(code) : problem.starterCode);
		} else {
			setUserCode(problem.starterCode);
		}
	}, [pid, user, problem.starterCode]);

	const onChange = (value: string) => {
		setUserCode(value);
		localStorage.setItem(`code-${pid}`, JSON.stringify(value));
	};

	return (
		<div className="flex flex-col bg-dark-layer-1 relative overflow-x-hidden">
			<PreferenceNav settings={settings} setSettings={setSettings} />
			<Split className="h-[calc(100vh-94px)]" direction="vertical" sizes={[60, 40]} minSize={60}>
				<div className="w-full overflow-auto">
					<ReactCodeMirror
						value={userCode}
						theme={vscodeDark}
						extensions={[javascript()]}
						style={{ fontSize: settings.fontSize }}
						onChange={onChange}
					/>
				</div>
				<div className="w-full pt-3 px-5 overflow-auto">
					<div className="flex items-center space-x-6">
						<div className="relative flex h-full flex-col justify-center cursor-pointer py-1 border-b-2 border-white">
							<div className="text-sm font-medium leading-5 text-white">Test Cases</div>
						</div>
					</div>
					<div className="flex mt-2">
						{problem.examples?.map((example, index) => (
							<div
								key={example.id}
								onClick={() => setActiveTestCaseId(index)}
								className="mr-2 items-start mt-2 text-white">
								<div className="flex flex-wrap items-center gap-y-4">
									<div
										className={`font-medium items-center transition-all focus:outline-none inline-flex bg-dark-fill-3 hover:bg-dark-fill-2 relative rounded-lg px-4 py-1 cursor-pointer whitespace-nowrap ${
											activeTestCaseId === index ? "text-white" : "text-gray-500"
										}`}>
										Case {index + 1}
									</div>
								</div>
							</div>
						))}
					</div>
					<div className="font-semibold my-4">
						<p className="text-sm font-medium mt-4 text-white">Input:</p>
						<div className="w-full cursor-text rounded-lg border px-3 py-[10px] bg-dark-fill-3 border-transparent text-white mt-2">
							{problem.examples[activeTestCaseId]?.inputText}
						</div>

						<p className="text-sm font-medium mt-4 text-white">Output:</p>
						<div className="w-full cursor-text rounded-lg border px-3 py-[10px] bg-dark-fill-3 border-transparent text-white mt-2">
							{problem.examples[activeTestCaseId]?.outputText}
						</div>
					</div>
				</div>
			</Split>
			<EditorFooter handleSubmit={handleSubmit} />
		</div>
	);
};

export default Playground;
