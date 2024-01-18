import {
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import GenreList, { GenreListProps } from "./GenreList.tsx";
import { BsChevronRight } from "react-icons/bs";

const MobileGenreDrawer = ({
  selectedGenre,
  onSelectGenre,
}: GenreListProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button rightIcon={<BsChevronRight />} onClick={onOpen}>
        Genre: {selectedGenre?.name}
      </Button>
      <Drawer placement={"left"} onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerBody marginTop={10}>
            <GenreList
              onSelectGenre={(genre) => {
                onSelectGenre(genre);
                onClose();
              }}
              selectedGenre={selectedGenre}
            ></GenreList>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default MobileGenreDrawer;
