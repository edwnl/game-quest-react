import { Box, Text, Link, Flex } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Box as="footer" bg="gray.800" color="white" p={4}>
      <Flex justify="space-between" align="center">
        <Text>Made with ❤️ by Edwin</Text>
        <Flex>
          <Link mx={2} target="_blank" href="https://github.com/edwnl/game-quest-react">
            Source Code
          </Link>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Footer;
