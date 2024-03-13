import React from "react";
import styled from "styled-components/native";
import IonIcon from "@expo/vector-icons/Ionicons";

// custom components
import { colors } from "../colors";
import RegularText from "../Texts/RegularText";
import SmallText from "../Texts/SmallText";

const CardItemSectionBackground = styled.View`
  width: 87%;
  padding-bottom: 15px;
  flex: 2;
`;

const CardItemRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 15px;
  margin-top: 23px;
`;

const CardItemList = styled.FlatList`
  width: 100%;
`;

// types
import { CardListProps } from "./types";

const VerticalCardList = <T extends unknown>({
  title,
  subtitle,
  renderItemComponent: RenderItemComponent,
  keyExtractor,
  data,
}: CardListProps<T>) => {
  return (
    <CardItemSectionBackground>
      <CardItemRow>
        <RegularText textStyles={{ fontSize: 19 }}>{title}</RegularText>
        <SmallText>
          {subtitle}
          <IonIcon name='caret-down' size={13} color={colors.darkgray} />
        </SmallText>
      </CardItemRow>
      <CardItemList
        data={data}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 25,
        }}
        keyExtractor={keyExtractor as ((item: unknown) => string) | undefined}
        renderItem={({ item }) => <RenderItemComponent item={item as T} />}
      />
    </CardItemSectionBackground>
  );
};

export default VerticalCardList;
