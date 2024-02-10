"use client";
import { Box, Center, Checkbox, IconButton } from "@yamada-ui/react";
import type { FC } from "react";
import { FaTrash } from "react-icons/fa";

interface TodoListProps {
	i: number;
	v: string;
	isChecked: boolean;
	handleTodoComplete: (i: number) => void;
	handleTodoDelete: (i: number) => void;
}

export const TodoItem: FC<TodoListProps> = ({
	i,
	v,
	isChecked,
	handleTodoComplete,
	handleTodoDelete,
}) => {
	return (
		<Center>
			<Box flex={1}>
				<Checkbox
					isChecked={isChecked}
					onChange={() => {
						handleTodoComplete(i);
					}}
				>
					{v}
				</Checkbox>
			</Box>
			<Box>
				<IconButton
					onClick={() => handleTodoDelete(i)}
					colorScheme="danger"
					size="lg"
					icon={<FaTrash />}
				/>
			</Box>
		</Center>
	);
};
