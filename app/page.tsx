"use client";
import { useState } from "react";
import ProblemsTable from "@/components/problemsTable/ProblemsTable";
import Topbar from "@/components/topbar/Topbar";
import useHasMounted from "@/hooks/useHasMounted";

const LoadingSkeleton = () => {
	return (
		<div className="flex items-center space-x-12 mt-4 px-6">
			<div className="w-6 h-6 shrink-0 rounded-full bg-dark-layer-1"></div>
			<div className="h-4 sm:w-52 w-32 rounded-full bg-dark-layer-1"></div>
			<div className="h-4 sm:w-52 w-32 rounded-full bg-dark-layer-1"></div>
			<div className="h-4 sm:w-52 w-32 rounded-full bg-dark-layer-1"></div>
			<span className="sr-only">Loading...</span>
		</div>
	);
};

export default function Home() {
	const [loading, setLoading] = useState(true);
	const hasMounted = useHasMounted();

	if (!hasMounted) return null;

	return (
		<main className="bg-dark-layer-2 min-h-screen">
			<Topbar />
			<h1 className="text-2xl text-center text-gray-700 dark:text-gray-400 font-medium uppercase mt-10 mb-5">
				&#8220; Its Never Late to Start 🕒 &rdquo;
			</h1>
			<div className="relative overflow-x-auto mx-auto px-6 pb-10">
				{loading && (
					<div className="max-w-[1200px] mx-auto sm:w-max w-full animate-pulse">
						{[...Array(10)].map((_, index) => (
							<LoadingSkeleton key={index} />
						))}
					</div>
				)}
				<table className="text-sm text-left text-gray-500 dark:text-gray-400 sm:w-7/12 w-full max-w-[1200px] mx-auto">
					{!loading && (
						<thead className="text-xs text-gray-700 uppercase dark:text-gray-400 border-b">
							<tr>
								<th scope="col" className="px-1 py-3 w-0 font-medium">
									Status
								</th>
								<th scope="col" className="px-6 py-3 w-0 font-medium">
									Title
								</th>
								<th scope="col" className="px-6 py-3 w-0 font-medium">
									Difficulty
								</th>
								<th scope="col" className="px-6 py-3 w-0 font-medium">
									Category
								</th>
								<th scope="col" className="px-6 py-3 w-0 font-medium">
									Solution
								</th>
							</tr>
						</thead>
					)}
					<ProblemsTable setLoading={setLoading} />
				</table>
			</div>
		</main>
	);
}

//In future, if we wanna add more problems
// const [input, setInput] = useState({
//    id: "",
//    title: "",
//    difficulty: "",
//    category: "",
//    videoId: "",
//    link: "",
//    order: 0,
//    likes: 0,
//    dislikes: "",
// });

// const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//    setInput({
//       ...input,
//       [e.target.name]: e.target.value,
//    });
// };

// const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//    e.preventDefault();

//    const newProblem = {
//       ...input,
//       order: Number(input.order),
//    };
//    await setDoc(doc(firestore, "problems", input.id), newProblem);
//    alert("saved to db");
// };
{
	/* <form className="p-6 flex flex-col max-w-sm gap-3 text-black" onSubmit={handleSubmit}>
				<input onChange={handleInputChange} type="text" placeholder="Problem id" name="id" />
				<input onChange={handleInputChange} type="text" placeholder="title" name="title" />
				<input onChange={handleInputChange} type="text" placeholder="difficulty" name="difficulty" />
				<input onChange={handleInputChange} type="text" placeholder="category" name="category" />
				<input onChange={handleInputChange} type="text" placeholder="order" name="order" />
				<input onChange={handleInputChange} type="text" placeholder="videoId" name="videoId" />
				<input onChange={handleInputChange} type="text" placeholder="link?" name="link" />
				<button className="bg-green-700">Save to db</button>
			</form> */
}
