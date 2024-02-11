import { Layout } from "@/components/common/layout";
import { Box, Flex, Heading, Spacer, Text } from "@yamada-ui/react";
import type { FC } from "react";

const mock_data = [
	{
		userName: "hoge",
		mbti: "探検家",
		tags: ["ゲーム", "食べ歩き", "映画"],
		message: "こんにちは",
		time: "5分前",
	},
	{
		userName: "hoge",
		mbti: "探検家",
		tags: ["ゲーム", "食べ歩き", "映画"],
		message: "こんにちは",
		time: "1時間前",
	},
	{
		userName: "hoge",
		mbti: "探検家",
		tags: ["ゲーム", "食べ歩き", "映画"],
		message: "こんにちは",
		time: "2時間前",
	},
];

const Message: FC = () => {
	return (
		<Layout>
			{mock_data.map((item, index) => (
				<>
					<Flex w="full" gap="md">
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
							<Box>
								<Heading size="md">{item.message}</Heading>
							</Box>
						</Box>
						<Spacer />
						{item.time}
					</Flex>
				</>
			))}
		</Layout>
	);
};

export default Message;
