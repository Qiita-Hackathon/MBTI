import { Button, Center, Container, Heading } from "@yamada-ui/react";
import type { FC } from "react";

const Home: FC = () => {
	return (
		<Container>
			<Center flexDir="column" gap={2}>
				<Heading>Hello World</Heading>
				<Button as="a" href="https://yamada-ui.com" target="_blank">
					Click Here!
				</Button>
			</Center>
		</Container>
	);
};

export default Home;
