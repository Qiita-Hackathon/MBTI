import { Layout } from "@/components/common/layout";
import { Box, Button, HStack, Heading, Text } from "@yamada-ui/react";
import type { FC } from "react";

const mock_data = [
	{
		userName: "hoge",
		mbti: "探検家",
		tags: ["ゲーム", "食べ歩き", "映画"],
	},
	{
		userName: "hoge",
		mbti: "探検家",
		tags: ["ゲーム", "食べ歩き", "映画"],
	},
	{
		userName: "hoge",
		mbti: "探検家",
		tags: ["ゲーム", "食べ歩き", "映画"],
	},
];

const Home: FC = () => {
	return (
		<>
			<HStack
				position="absolute"
				top={0}
				justify="center"
				w="100vw"
				py={5}
				borderBottom="1px solid black"
				backgroundColor="#fff"
			>
				<Button colorScheme="amber">MTBI情報</Button>
				<Button>タグ絞り込み</Button>
			</HStack>
			<Layout>
				{mock_data.map((item, index) => (
					<Box key={`${index}-${item.userName}`} p={3}>
						<Heading size="lg">{item.userName}</Heading>
						<Text>MBTI: {item.mbti}</Text>
						<Box>
							<Text size="1rem">
								タグ:{" "}
								{item.tags.map((e, i) => (
									<Box as="span" key={`${i}-${e}`} px={2}>
										{e}
									</Box>
								))}
							</Text>
						</Box>
					</Box>
				))}
			</Layout>
		</>
	);
};

export default Home;
