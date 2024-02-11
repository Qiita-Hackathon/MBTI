"use client";
import { Layout } from "@/components/common/layout";
import { Badge, Box, Card, HStack, Heading, Text } from "@yamada-ui/react";
import { type FC, useEffect, useState } from "react";

interface CategoryTag {
	tagId: number;
	categoryGroup: string;
	tagName: string;
}

interface Users {
	id: number;
	userName: string;
	userIcon: string;
	mbti: string;
	categoryTag: CategoryTag[];
}

const Home: FC = () => {
	const [profiles, setProfiles] = useState<Users[]>([]);

	const firstFetch = async () => {
		if (profiles.length > 0) {
			return;
		}
		const response = await fetch(
			"http://localhost:8080/api/profile/all?mbtiId=1",
		);
		const { profiles: newProfiles } = await response.json();
		setProfiles(newProfiles);
		console.log(newProfiles);
	};

	useEffect(() => {
		firstFetch();
	}, [firstFetch]);

	return (
		<Layout>
			{profiles.map((item, index) => (
				<Card key={`${index}-${item.userName}`} p={3}>
					<Heading size="lg">{item.userName}</Heading>
					<Text>MBTI: {item.mbti}</Text>
					<HStack gap={2} fontSize="1rem">
						<Box>タグ: </Box>
						{item.categoryTag.map((e, i) => (
							<Badge as="span" key={`${i}-${e.tagId}`} px={2}>
								{e.categoryGroup}: {e.tagName}
							</Badge>
						))}
					</HStack>
				</Card>
			))}
		</Layout>
	);
};

export default Home;
