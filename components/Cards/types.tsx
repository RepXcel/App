// types.ts
import { FunctionComponent, ReactNode } from "react";
import { GestureResponderEvent, StyleProp, ViewStyle } from "react-native";

export interface CardProps<T> {
  viewStyles?: StyleProp<ViewStyle>;
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
  children: ReactNode;
  data: T;
  activeOpacity?: number;
}

export interface CardListProps<T extends unknown> {
  title: string;
  subtitle: string;
  renderItemComponent: FunctionComponent<{ item: T }>;
  keyExtractor?: (item: T) => string;
  data: T[];
  selectedIndex?: number;
  ref?: any;
}
