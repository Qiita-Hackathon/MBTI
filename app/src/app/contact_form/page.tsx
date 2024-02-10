"use client";
import {
	Box,
	Button,
	Container,
	FormControl,
	Heading,
	Input,
	Textarea,
} from "@yamada-ui/react";
import { useState } from "react";
import type { ChangeEvent, FC, FormEvent } from "react";

const ContactForm: FC = () => {
	const [userName, setUserName] = useState<string>("");
	const [userEmail, setUserEmail] = useState<string>("");
	const [userContent, setUserContent] = useState<string>("");

	const handleUserNameChange = (e: ChangeEvent<HTMLInputElement>) => {
		setUserName(e.currentTarget.value);
	};

	const handleUserEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
		setUserEmail(e.currentTarget.value);
	};

	const handleUserContent = (e: ChangeEvent<HTMLTextAreaElement>) => {
		setUserContent(e.currentTarget.value);
	};

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log(`${userName},${userEmail}, ${userContent}`);
	};

	return (
		<Container>
			<form onSubmit={handleSubmit}>
				<Heading>お問い合わせフォーム</Heading>
				<FormControl label="name" isRequired>
					<Input
						type="text"
						placeholder="your name"
						value={userName}
						onChange={handleUserNameChange}
					/>
				</FormControl>
				<FormControl label="Email address" isRequired>
					<Input
						type="email"
						placeholder="your email address"
						value={userEmail}
						onChange={handleUserEmailChange}
					/>
				</FormControl>
				<FormControl label="content" isRequired>
					<Textarea
						placeholder="content"
						value={userContent}
						onChange={handleUserContent}
					/>
				</FormControl>
				<Box pt={5}>
					<Button type="submit">send</Button>
				</Box>
			</form>
		</Container>
	);
};

export default ContactForm;
