import { IoHomeOutline } from "react-icons/io5";
import { MdMessage } from "react-icons/md";
import { IoMdLogOut } from "react-icons/io";
import { CiSettings } from "react-icons/ci";
import { Box, Button, HStack, IconButton, VStack } from "@yamada-ui/react";
import type { FC, ReactNode } from "react";

interface LayoutProps {
	children: ReactNode;
}

export const Layout: FC<LayoutProps> = ({ children }) => {
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
			<VStack
				position="absolute"
				top={0}
				left={0}
				alignItems="center"
				borderRight="1px solid black"
				backgroundColor="#fff"
				justify="center"
				w="60px"
				px="6px"
				h="calc(100dvh)"
			>
				<IconButton size="lg" icon={<IoHomeOutline />} />
				<IconButton size="lg" icon={<MdMessage />} />
				<IconButton size="lg" icon={<CiSettings />} />
				<IconButton size="lg" icon={<IoMdLogOut />} />
			</VStack>
			<Box pt={"81px"} pl={"60px"} height={"100vh"} overflowY={"scroll"}>
				{children}
			</Box>
		</>
	);
};
