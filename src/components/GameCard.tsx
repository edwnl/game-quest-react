import { Game } from "../hooks/useGames.ts";
import { Card, CardBody, Heading, Image } from "@chakra-ui/react";

interface Props {
  game: Game;
}

function GameCard({ game }: Props) {
  return (
    // overflow="hidden" hides the overflowing image from Card.
    <Card borderRadius={10} overflow="hidden">
      <Image src={game.background_image} />
      <CardBody>
        <Heading fontSize={"2xl"}>{game.name}</Heading>
      </CardBody>
    </Card>
  );
}

export default GameCard;
