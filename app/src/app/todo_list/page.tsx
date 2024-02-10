"use client";
import {
	Box,
	Button,
	Container,
	FormControl,
	Heading,
	Input,
	Reorder,
	ReorderItem,
} from "@yamada-ui/react";
import type { ChangeEvent, FC } from "react";
import { useState } from "react";
import { TodoItem } from "../components/TodoItem";

const TodoList: FC = () => {
	const [todoName, setTodoName] = useState<string>("");
	const [todos, setTodos] = useState<string[]>([]);
	const [completedTodos, setCompletedTodos] = useState<string[]>([]); //チェックされたTodoを格納する配列

	const handleTodoNameChange = (e: ChangeEvent<HTMLInputElement>) => {
		setTodoName(e.currentTarget.value);
	};

	const handleTodoAdd = () => {
		if (todoName === "") return;
		setTodos((prev) => [...prev, todoName]);
		setTodoName("");
	};

	const handleTodoComplete = (index: number) => {
		setCompletedTodos((prev) => [...prev, todos[index]]); //チェックされたTodoを完了一覧に追加
		setTodos((prevTodos) => {
			return prevTodos.filter((_, i) => i !== index);
		});
	};

	const handleReturnTodos = (index: number) => {
		setTodos((prev) => [...prev, completedTodos[index]]); //完了一覧からTodoリストに戻す
		setCompletedTodos((prevCompletedTodos) => {
			return prevCompletedTodos.filter((_, i) => i !== index);
		});
	};

	const handleTodoDelete = (index: number) => {
		setTodos((prevTodos) => {
			return prevTodos.filter((_, i) => i !== index);
		});
	};

	const handleCompletedTodoDelete = (index: number) => {
		setCompletedTodos((prevCompletedTodos) => {
			return prevCompletedTodos.filter((_, i) => i !== index);
		});
	};

	return (
		<Container>
			<Heading>Todo List</Heading>
			<FormControl label="Todo">
				<Input
					type="text"
					placeholder="content"
					value={todoName}
					onChange={handleTodoNameChange}
				/>
			</FormControl>
			<Box>
				<Button onClick={handleTodoAdd}>add</Button>
			</Box>
			{/* Todo一覧 */}
			<Box>
				<Heading>Todo</Heading>
				<Reorder width={"70%"}>
					{todos.map((v, i) => (
						<ReorderItem key={`${v}-${i}`} label={`${i} ${v}`}>
							<TodoItem
								i={i}
								v={v}
								isChecked={!(todos.indexOf(v) > -1)}
								handleTodoComplete={handleTodoComplete}
								handleTodoDelete={handleTodoDelete}
							/>
						</ReorderItem>
					))}
				</Reorder>
			</Box>
			{/* 完了したTodo一覧 */}
			<Box>
				<Heading>Completed</Heading>
				<Reorder width={"70%"}>
					{completedTodos.map((v, i) => (
						<ReorderItem key={`${v}-${i}`} label={`${i} ${v}`}>
							<TodoItem
								i={i}
								v={v}
								isChecked={completedTodos.indexOf(v) > -1}
								handleTodoComplete={handleReturnTodos}
								handleTodoDelete={handleCompletedTodoDelete}
							/>
						</ReorderItem>
					))}
				</Reorder>
			</Box>
		</Container>
	);
};

export default TodoList;
