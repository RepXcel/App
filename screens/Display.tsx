import React, { FunctionComponent, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import styled from "styled-components/native";

// custom components
import { colors } from "../components/colors";
import { Container } from "../components/shared";
import RegularButton, {
  BottomButtonContainer,
} from "../components/Buttons/RegularButton";
import { StackScreenProps } from "@react-navigation/stack";
import { CombinedProps } from "../navigation/TabNavigator";
import ScreenCard from "../components/Cards/ScreenCard";
import HorizontalCardList from "../components/Cards/HorizontalCardList";
import VerticalCardList from "../components/Cards/VerticalCardList";
import HistoryEntryCard from "../components/Cards/DataCards/HistoryEntryCard";
import DisplayCard from "../components/Cards/DataCards/DisplayCard";
import { Session } from "../data/dataStructure";

import { useBleContext, useUserContext } from "../src/Contexts";
import localStorage from "../src/backend/localStorage";
import { useIsFocused } from "@react-navigation/native";

const DisplayContainer = styled(Container)`
  background-color: ${colors.lightgray};
  width: 100%;
  flex: 1;
  justify-content: flex-end;
`;

type Props = StackScreenProps<CombinedProps, "Display">;

const Display: FunctionComponent<Props> = ({ navigation }) => {
  const { startStreamingData } = useBleContext();
  const { retrieveData, retrieveSessionData } = localStorage();
  const { username } = useUserContext();
  const isFocused = useIsFocused();

  const [calibrated, setCalibrated] = React.useState(false);
  const [sessionData, setSessionData] = React.useState<Session[]>([]);

  useEffect(() => {
    if (isFocused) {
      (async () => {
        const user = await retrieveData(username);
        if (user?.rpe0Velocity && user.rpe10Velocity) {
          setCalibrated(true);
        }
      })();

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


  const sortedSession = sessionData.slice().sort((a, b) => {
    return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
  });

  return (
    <DisplayContainer>
      <StatusBar style='dark' />
      <HorizontalCardList
        title='Entries'
        subtitle='Newest'
        renderItemComponent={({ item }: { item: Session }) => (
          <DisplayCard data={item}>
            <></>
          </DisplayCard>
        )}
        keyExtractor={(item) => item.id.toString()}
        data={sortedSession}
      />
      <BottomButtonContainer>
        <RegularButton
          onPress={async () => {
            startStreamingData();
            if (calibrated) {
              navigation.navigate("Session");
            }
            else {
              navigation.navigate("Calibration");
            }
          }}
          btnStyles={{
            marginBottom: 20,
          }}
        >
          {calibrated ? "Start Session" : "Calibrate"}
        </RegularButton>
      </BottomButtonContainer>
    </DisplayContainer>
  );
};

export default Display;
