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

import { useUserContext } from "../src/Contexts";
import localStorage from "../src/backend/localStorage";
import { useIsFocused, useNavigation } from "@react-navigation/native";

const HistoryContainer = styled(Container)`
  background-color: ${colors.lightgray};
  width: 100%;
  flex: 1;
`;

//navigation
import { StackScreenProps } from "@react-navigation/stack";
import { TabParamList } from "../navigation/TabNavigator";
import { RootStackParamList } from "../navigation/AppStack";

type Props = StackScreenProps<RootStackParamList, "TabNavigator"> &
  StackScreenProps<TabParamList, "History">;

const History: FunctionComponent<Props> = ({ navigation }) => {
  const { retrieveSessionData } = localStorage();
  const { username } = useUserContext();
  const isFocused = useIsFocused();

  const [sessionData, setSessionData] = React.useState<Session[]>([]);

  React.useEffect(() => {
    if (isFocused) {
      (async () => {
        let data = await retrieveSessionData(username);
        const sessions: Session[] = [];
        for (let i = 0; i < data.length; i++) {
          let session = data[i];
          if (session.velocities) {
            let iVelocities = session.velocities.map((v) => {
              if (v != undefined || v != null) {
                return v;
              } else {
                return 0;
              }
            });

            let sessionData: Session = {
              id: session.id,
              startDate: new Date(session.date),
              velocities: iVelocities,
              rpe: session.rpe,
            };
            sessions.push(sessionData);
          }
        }
        setSessionData(sessions);
      })();
    }
  }, [isFocused]);

  const sortedSessionData = sessionData.slice().sort((a, b) => {
    return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
  });

  navigation = useNavigation();
  const navigateToDisplay = (selectedIndex: number) => {
    navigation.navigate("Display", { selectedIndex });
  };

  return (
    <HistoryContainer>
      <VerticalCardList
        title='Entries'
        subtitle='Newest'
        renderItemComponent={({ item }: { item: Session }) => (
          <HistoryEntryCard
            data={item}
            onPress={() =>
              navigateToDisplay(
                //pass in navigation the current index of the card
                sortedSessionData.findIndex((session) => session.id === item.id)
              )
            }
          >
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
