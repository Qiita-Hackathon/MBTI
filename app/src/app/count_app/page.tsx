"use client";
import { Box, Button, Container, Heading, Text } from "@yamada-ui/react";
import { useState } from "react";
import type { FC } from "react";

const Count: FC = () => {
	// count:変数(初期値:0), setCount:セッター関数(countの値を変更する関数)
	const [count, setCount] = useState<number>(0);
	const handlePluse = () => {
		console.log("click");
		setCount(count + 1);
		console.log(`count:·${count}`);
	};
	const handleMinus = () => {
		if (count === 0) return;
		setCount(count - 1);
	};
	return (
		<Container>
			<Heading>count app</Heading>
			<Text>count : {count}</Text>
			<Box display={"flex"} gap={"1"}>
				<Button onClick={handlePluse}>+</Button>
				<Button onClick={handleMinus}>-</Button>
			</Box>
		</Container>
	);
};

export default Count;
