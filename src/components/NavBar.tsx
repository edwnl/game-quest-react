import { HStack, Image } from "@chakra-ui/react";
import { TbHexagonLetterG } from "react-icons/tb";
import ColorModeSwitch from "./ColorModeSwitch.tsx";
import SearchInput from "./SearchInput.tsx";

interface Props {
  onSearch: (searchText: string) => void;
}

const NavBar = ({ onSearch }: Props) => {
  return (
    <HStack padding="15px">
      <Image as={TbHexagonLetterG} boxSize="60px" />
      <SearchInput onSearch={onSearch} />
      <ColorModeSwitch />
    </HStack>
  );
};

export default NavBar;
