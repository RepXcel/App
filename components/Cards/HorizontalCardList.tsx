import React, { useRef } from "react";
import styled from "styled-components/native";
import { FlatList, useWindowDimensions } from "react-native";

const CardItemSectionBackground = styled.View`
  width: 100%;
  padding-bottom: 15px;
  padding-top: 23px;
  flex: 2;
  align-items: center;
`;

const CardItemList = styled.FlatList`
  width: 100%;
  flex: 1;
  padding-left: 25px;
  padding-bottom: 15px;
`;

// types
import { CardListProps } from "./types";

const HorizontalCardList = <T extends unknown>({
  renderItemComponent: RenderItemComponent,
  keyExtractor,
  data,
}: CardListProps<T>) => {
  const { width } = useWindowDimensions();

  const flatListRef = useRef<FlatList<unknown>>(null);

  return (
    <CardItemSectionBackground>
      <CardItemList
        data={data}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingRight: 25,
          alignItems: "center",
        }}
        keyExtractor={keyExtractor as ((item: unknown) => string) | undefined}
        // keyExtractor={({ id }: any) => id.toString()}
        renderItem={({ item }) => <RenderItemComponent item={item as T} />}
        snapToInterval={width - 25} // Adjust this value
        decelerationRate={"fast"} // Adjust the deceleration rate if needed
      />
    </CardItemSectionBackground>
  );
};

export default HorizontalCardList;
