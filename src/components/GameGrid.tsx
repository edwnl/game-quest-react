import { Image, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import useGames from "../hooks/useGames.ts";
import GameCard from "./GameCard.tsx";
import GameCardSkeleton from "./GameCardSkeleton.tsx";
import GameCardContainer from "./GameCardContainer.tsx";
import { GameQuery } from "../App.tsx";
import empty from "../assets/empty.svg";

interface Props {
  gameQuery: GameQuery;
}

const GameGrid = ({ gameQuery }: Props) => {
  const { data, error, isLoading } = useGames(gameQuery);
  const skeletons = [...Array(15).keys()];

  if (error) return <Text>{error}</Text>;

  if (data.length === 0 && !isLoading)
    return (
      <VStack>
        <Image boxSize={"150px"} src={empty} />
        <Text fontWeight={"bold"}>No games found!</Text>
      </VStack>
    );

  return (
    <SimpleGrid columns={{ sm: 1, md: 2, lg: 3, xl: 4 }} spacing={6}>
      {isLoading
        ? skeletons.map((skeleton) => (
            <GameCardContainer key={skeleton}>
              <GameCardSkeleton />
            </GameCardContainer>
          ))
        : data.map((game) => (
            <GameCardContainer key={game.id}>
              <GameCard game={game}></GameCard>
            </GameCardContainer>
          ))}
    </SimpleGrid>
  );
};

export default GameGrid;
