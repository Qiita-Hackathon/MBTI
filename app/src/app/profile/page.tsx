"use client";

import {
	Box,
	Button,
	Container,
	FormControl,
	Input,
	Radio,
	RadioGroup,
	Textarea,
} from "@yamada-ui/react";
import { type ChangeEvent, type FC, type FormEvent, useState } from "react";

const Profile: FC = () => {
	const [userName, setUserName] = useState<string>("");
	const [userBirth, setUserBirth] = useState<string>("");
	const [userAboutMe, setUserAboutMe] = useState<string>("");
	const [userSex, setUserSex] = useState<string>("");
	const handleUserNameChange = (e: ChangeEvent<HTMLInputElement>) => {
		setUserName(e.currentTarget.value);
	};
	const handleUserBirthChange = (e: ChangeEvent<HTMLInputElement>) => {
		setUserBirth(e.currentTarget.value);
	};
	const handleUserAboutMeChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
		setUserAboutMe(e.currentTarget.value);
	};
	const handleUserSex = (value: string) => {
		setUserSex(value);
	};

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log(`${userName}, ${userBirth}, ${userAboutMe}, ${userSex}`);
	};

	return (
		<Container>
			<form onSubmit={handleSubmit}>
				<FormControl label="name" isRequired>
					<Input
						type="text"
						placeholder="your name"
						value={userName}
						onChange={handleUserNameChange}
					/>
				</FormControl>
				<FormControl label="yourBirth" isRequired>
					<Input
						type="date"
						value={userBirth}
						onChange={handleUserBirthChange}
					/>
				</FormControl>
				<FormControl label="aboutMe" isRequired>
					<Textarea
						placeholder="about me"
						value={userAboutMe}
						onChange={handleUserAboutMeChange}
					/>
				</FormControl>
				<FormControl label="sex" isRequired>
					<RadioGroup onChange={handleUserSex} value={userSex} direction="row">
						<Radio value="0">male</Radio>
						<Radio value="1">female</Radio>
					</RadioGroup>
				</FormControl>
				<Box pt={1}>
					<Button type="submit">submit</Button>
				</Box>
			</form>
		</Container>
	);
};

export default Profile;
