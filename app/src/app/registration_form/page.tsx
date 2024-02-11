"use client";
import {
	Autocomplete,
	AutocompleteOption,
	Box,
	Button,
	Card,
	CardBody,
	CardHeader,
	Center,
	Container,
	Flex,
	FormControl,
	Grid,
	Heading,
	Image,
	Input,
	InputGroup,
	InputRightElement,
	LinkBox,
	LinkOverlay,
	Radio,
	RadioGroup,
	Text,
	Textarea,
	useBoolean,
} from "@yamada-ui/react";
import { useState } from "react";
import type { ChangeEvent, FC, FormEvent } from "react";

const ContactForm: FC = () => {
	const [userName, setUserName] = useState<string>("");
	const [userEmail, setUserEmail] = useState<string>("");
	const [userContent, setUserContent] = useState<string>("");

	const mbtiOptions = [
		{
			value: "ISFP",
			description: "ISFP(冒険家型)",
			detail: "芸術的で感受性豊か、現在を生きる",
			color: "yellow",
			img: "/img/IS/ISFP.png",
		},
		{
			value: "ISTP",
			description: "ISTP(巨匠型)",
			detail: "論理的で現実的、手を動かして学ぶ",
			color: "yellow",
			img: "../img/IS/ISTP.png",
		},
		{
			value: "ESFP",
			description: "ESFP(エンターテイナー型)",
			detail: "社交的で活発、瞬間を楽しむ",
			color: "yellow",
			img: "../img/ES/ESFP.png",
		},
		{
			value: "ESTP",
			description: "ESTP(起業家型)",
			detail: "冒険的で元気、行動派",
			color: "yellow",
			img: "../img/ES/ESTP.png",
		},
		{
			value: "ENTP",
			description: "ENTP(討論者型)",
			detail: "発明的で好奇心旺盛、新しいことに挑戦する",
			color: "purple",
			img: "../img/EN/ENTP.png",
		},
		{
			value: "INTJ",
			description: "INTJ(建築家型)",
			detail: "戦略的で独立心が強く、効率を重視する",
			color: "purple",
			img: "../img/IN/INTJ.png",
		},
		{
			value: "INTP",
			description: "INTP(論理学者型)",
			detail: "革新的で思索好き、理論を追求する",
			color: "purple",
			img: "../img/IN/INTP.png",
		},
		{
			value: "ENTJ",
			description: "ENTJ(指揮官型)",
			detail: "決断力がありリーダーシップが高い、目標達成に向けて動く",
			color: "purple",
			img: "../img/EN/ENTJ.png",
		},
		{
			value: "ESFJ",
			description: "ESFJ(領事官型)",
			detail: "協調性があり気配りができる、人との調和を重んじる",
			color: "blue",
			img: "../img/ES/ESFJ.png",
		},
		{
			value: "ISFJ",
			description: "ISFJ(擁護者型)",
			detail: "忠実で温かい、人の世話を焼く",
			color: "blue",
			img: "../img/IS/ISFJ.png",
		},
		{
			value: "ESTJ",
			description: "ESTJ(幹部型)",
			detail: "組織的で責任感が強い、伝統を尊重する",
			color: "blue",
			img: "../img/ES/ESTJ.png",
		},
		{
			value: "ISTJ",
			description: "ISTJ(管理者型)",
			detail: "実直で真面目、事実に基づいて行動する",
			color: "blue",
			img: "../img/IS/ISTJ.png",
		},
		{
			value: "ENFP",
			description: "ENFP(広報運動家型)",
			detail: "熱意があり創造的、可能性を追求する",
			color: "green",
			img: "../img/EN/ENFP.png",
		},
		{
			value: "INFJ",
			description: "INFJ(提唱者型)",
			detail: "洞察力があり理想主義的、深い洞察と人間理解",
			color: "green",
			img: "../img/IN/INFJ.png",
		},
		{
			value: "INFP",
			description: "INFP(仲介者型)",
			detail: "情熱的で内省的、個人の価値を大切にする",
			color: "green",
			img: "../img/IN/INFP.png",
		},
		{
			value: "ENFJ",
			description: "ENFJ(主人公型)",
			detail: "カリスマ的で共感的、他者を奮い立たせる",
			color: "green",
			img: "../img/EN/ENFJ.png",
		},
	];

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

	// passwordの表示非表示
	const [show, { toggle }] = useBoolean();

	return (
		<Container>
			<form onSubmit={handleSubmit}>
				<Heading>New Registration Form</Heading>
				<Text fontSize="2xl">Basic Information</Text>
				<Center flexDir="column" gap={30}>
					<FormControl label="username" isRequired>
						<Input
							type="text"
							placeholder="your name"
							value={userName}
							onChange={handleUserNameChange}
						/>
					</FormControl>
				</Center>
				<FormControl label="Email address" isRequired>
					<Input
						type="email"
						placeholder="your-address@example.com"
						value={userEmail}
						onChange={handleUserEmailChange}
					/>
				</FormControl>

				<FormControl label="password" isRequired>
					<InputGroup size="md">
						<Input
							pr="4.5rem"
							type={show ? "text" : "password"}
							placeholder="your password"
						/>
						<InputRightElement w="4.5rem" isClick>
							<Button h="1.75rem" size="sm" onClick={toggle}>
								{show ? "Hide" : "Show"}
							</Button>
						</InputRightElement>
					</InputGroup>
				</FormControl>

				<FormControl label="Sex" isRequired>
					<RadioGroup defaultValue="all">
						<Radio value="man">男性(man)</Radio>
						<Radio value="woman">女性(woman)</Radio>
					</RadioGroup>
				</FormControl>

				<FormControl label="occupation">
					<Input placeholder="your occupation" />
				</FormControl>

				<FormControl label="self-introduction" isRequired>
					<Textarea
						placeholder="self-introduction"
						value={userContent}
						onChange={handleUserContent}
					/>
				</FormControl>

				<Text fontSize="2xl">MBTI</Text>

				<Text fontSize="1xl">これから診断される方はこちらをクリック</Text>
				<LinkBox
					as="article"
					maxW="8xl"
					p="md"
					rounded="md"
					border="1px solid"
					borderColor="inherit"
					boxShadow="md"
				>
					<Heading size="md" my="sm">
						<LinkOverlay
							href="https://www.16personalities.com/ja/%E6%80%A7%E6%A0%BC%E8%A8%BA%E6%96%AD%E3%83%86%E3%82%B9%E3%83%88"
							isExternal
						>
							MBTI診断
						</LinkOverlay>
					</Heading>

					<Text>
						MBTI診断は、その人の認識・決定理由・処理方法などを自己申告し、それをもとに16タイプの性格に当てはめて診断する自己申告型の診断テストです。
					</Text>
				</LinkBox>

				<Text fontSize="1xl">下記を参考にして選択しても構いません。</Text>
				<Grid w="full" templateColumns="repeat(4, 1fr)" gap="md">
					{mbtiOptions.map((Option) => (
						<Card
							key={Option.value}
							variant="subtle"
							colorScheme={Option.color}
							width="lg"
							height="lg"
						>
							<CardHeader>
								<Heading size="md">{Option.description}</Heading>
							</CardHeader>
							<Flex>
								<CardBody alignItems="center">
									<Text>{Option.detail}</Text>
									<Image
										src={Option.img}
										alt={Option.description}
										width="80%"
									/>
								</CardBody>
							</Flex>
						</Card>
					))}
				</Grid>

				{/* MBTIの色に合わせて選択肢の背景色も変えたい... */}
				<FormControl label="your MBTI" isRequired>
					<Autocomplete placeholder="your MBTI">
						{mbtiOptions.map((option) => (
							<AutocompleteOption key={option.value} value={option.value}>
								{option.description}
							</AutocompleteOption>
						))}
					</Autocomplete>
				</FormControl>

				<Box pt={5}>
					<Button type="submit">send</Button>
				</Box>
			</form>
		</Container>
	);
};

export default ContactForm;
