import React, { useRef } from "react";
import styled from "styled-components/native";
import { FlatList, useWindowDimensions, FlatListProps } from "react-native";

const CardItemSectionBackground = styled.View`
  width: 100%;
  padding-bottom: 15px;
  padding-top: 23px;
  flex: 2;
  align-items: center;
`;

//allow forwarding the ref to flatlist
const CardItemList = styled(
  React.forwardRef<FlatList<any>, FlatListProps<any>>((props, ref) => (
    <FlatList ref={ref} {...props} />
  ))
)`
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
  selectedIndex,
}: CardListProps<T>) => {
  const { width } = useWindowDimensions();

  const flatListRef = React.useRef<FlatList<unknown>>(null);

  React.useEffect(() => {
    // console.log("selectedIndex", selectedIndex);
    if (data.length > 0) {
      flatListRef.current?.scrollToIndex({ index: selectedIndex ?? 0 });
    }
  }, [data]);

  return (
    <CardItemSectionBackground>
      <CardItemList
        ref={flatListRef}
        data={data}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingRight: 25,
          alignItems: "center",
        }}
        keyExtractor={keyExtractor as ((item: unknown) => string) | undefined}
        renderItem={({ item }) => <RenderItemComponent item={item as T} />}
        snapToInterval={width - 25} // Adjust this value
        decelerationRate={"fast"} // Adjust the deceleration rate if needed
        onScrollToIndexFailed={(info) => {
          const wait = new Promise((resolve) => setTimeout(resolve, 200));
          wait.then(() => {
            flatListRef.current?.scrollToOffset({
              offset: info.averageItemLength * info.index,
              animated: false,
            });
          });
        }}
      />
    </CardItemSectionBackground>
  );
};

export default HorizontalCardList;
