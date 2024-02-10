"use client";
import { Button, Container, HStack, Text } from "@yamada-ui/react";
import { type FC, useState } from "react";

const defaultAnimals = ["dog", "cat", "hamster"];

const Animals: FC = () => {
	const [animalName, setAnimalName] = useState("");
	// const animalState = useState("")
	const handleAnimalChange = (animal: string) => {
		setAnimalName(animal);
		console.log(animal);
	};
	const handleAnimalClear = () => {
		setAnimalName("");
	};
	return (
		<>
			<Container>
				<Text>{animalName}</Text>
				<HStack>
					{defaultAnimals.map((v, i) => (
						<Button key={i} onClick={() => handleAnimalChange(v)}>
							{v}
						</Button>
					))}
					<Button onClick={handleAnimalClear}>Clear</Button>
				</HStack>
			</Container>
		</>
	);
};

export default Animals;
