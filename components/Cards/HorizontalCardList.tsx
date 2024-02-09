import React, { FunctionComponent } from "react";
import styled from "styled-components/native";
import IonIcon from "@expo/vector-icons/Ionicons";

// custom components
import { colors } from "../colors";
import RegularText from "../Texts/RegularText";
import SmallText from "../Texts/SmallText";

const CardItemSectionBackground = styled.View`
  width: 100%;
  padding-bottom: 15px;
  padding-top: 23px;
  flex: 2;
  border: 1px blue;
  align-items: center;
`;

const CardItemRow = styled.View`
  border: 1px green;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 87%;
  margin-bottom: 15px;
`;

const CardItemList = styled.FlatList`
  width: 100%;
  flex: 1;
  padding-left: 25px;
  padding-bottom: 15px;
  border: 1px yellow;
`;

// types
import { CardListProps } from "./types";

const HorizontalCardList = <T extends unknown>({
  title,
  subtitle,
  renderItemComponent: RenderItemComponent,
  keyExtractor,
  data,
}: CardListProps<T>) => {
  return (
    <CardItemSectionBackground>
      <CardItemRow>
        <RegularText textStyles={{ fontSize: 19, color: colors.secondary }}>
          {title}
        </RegularText>
        <SmallText textStyles={{ color: colors.secondary }}>
          {subtitle}
          <IonIcon name='caret-down' size={13} color={colors.darkgray} />
        </SmallText>
      </CardItemRow>
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
      />
    </CardItemSectionBackground>
  );
};

export default HorizontalCardList;
