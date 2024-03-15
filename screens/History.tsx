import React, { FunctionComponent } from "react";
import styled from "styled-components/native";

// color components
import { colors } from "../components/colors";
import { Container } from "../components/shared";

// custom components
import HistoryEntryCard from "../components/Cards/DataCards/HistoryEntryCard";
import VerticalCardList from "../components/Cards/VerticalCardList";

// data structure
import { Session } from "../data/dataStructure";

const HistoryContainer = styled(Container)`
  background-color: ${colors.lightgray};
  width: 100%;
  flex: 1;
`;

// Sample data
import { sessionData } from "../assets/tempdata/tempData";

const History: FunctionComponent = () => {
  const sortedSessionData = sessionData.slice().sort((a, b) => {
    return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
  });
  return (
    <HistoryContainer>
      <VerticalCardList
        title='Entries'
        subtitle='Newest'
        renderItemComponent={({ item }: { item: Session }) => (
          <HistoryEntryCard data={item}>
            <></>
          </HistoryEntryCard>
        )}
        keyExtractor={(item) => item.id.toString()}
        data={sortedSessionData}
      />
    </HistoryContainer>
  );
};

export default History;
