import React from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import { Card as PaperCard, Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Feather';

interface CardProps {
  title?: string;
  subtitle?: string;
  icon?: string;
  onPress?: () => void;
  children?: React.ReactNode;
  style?: ViewStyle;
  contentStyle?: ViewStyle;
}

export const Card = ({
  title,
  subtitle,
  icon,
  onPress,
  children,
  style,
  contentStyle,
}: CardProps) => {
  return (
    <PaperCard style={[styles.card, style]} onPress={onPress}>
      {(title || subtitle || icon) && (
        <PaperCard.Title
          title={title}
          subtitle={subtitle}
          left={icon ? (props) => <Icon name={icon} {...props} /> : undefined}
        />
      )}
      <PaperCard.Content style={[styles.content, contentStyle]}>
        {children}
      </PaperCard.Content>
    </PaperCard>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 8,
    borderRadius: 12,
    elevation: 2,
  },
  content: {
    paddingTop: 8,
  },
});

export default Card; 