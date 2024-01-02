import useGenres from "../hooks/useGenres.ts";
import {HStack, Image, List, ListItem, Text} from "@chakra-ui/react";
import getCroppedImageUrl from "../services/image-url.ts";

const GenreList = () => {
    const {data} = useGenres();

    // List element allows rendering a list without a bullet
    // point like <li>
    return (
        <List>
            {data.map(data =>
                <ListItem paddingY='5px' key={data.id}>
                    <HStack>
                        <Image
                            boxSize='32px'
                            borderRadius={8}
                            src={getCroppedImageUrl(data.image_background)} />
                        <Text fontSize='lg'>{data.name}</Text>
                    </HStack>
                </ListItem>)}
        </List>
    );
};

export default GenreList;
