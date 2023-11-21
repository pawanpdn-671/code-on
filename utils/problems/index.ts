import { Problem } from "../types/problem";
import { jumpGame } from "./jumpGame";
import { reverseLinkedList } from "./reverseLinkedList";
import { search2DMatrix } from "./search2dMatric";
import { twoSum } from "./twoSum";
import { validParentheses } from "./validParentheses";

interface ProblemMap {
	[key: string]: Problem;
}

export const problems: ProblemMap = {
	"two-sum": twoSum,
	"reverse-linked-list": reverseLinkedList,
	"jump-game": jumpGame,
	"search-a-2d-matrix": search2DMatrix,
	"valid-parentheses": validParentheses,
};
