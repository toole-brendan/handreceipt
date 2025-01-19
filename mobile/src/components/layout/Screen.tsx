import React from 'react';
import { StyleSheet, View, ViewStyle, SafeAreaView, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Appbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

interface ScreenProps {
  title?: string;
  showBack?: boolean;
  rightAction?: {
    icon: string;
    onPress: () => void;
  };
  style?: ViewStyle;
  contentStyle?: ViewStyle;
  scrollable?: boolean;
  children: React.ReactNode;
}

export const Screen = ({
  title,
  showBack = true,
  rightAction,
  style,
  contentStyle,
  scrollable = true,
  children,
}: ScreenProps) => {
  const navigation = useNavigation();

  const Content = () => (
    <View style={[styles.content, contentStyle]}>
      {children}
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, style]}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoid}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {title && (
          <Appbar.Header>
            {showBack && <Appbar.BackAction onPress={() => navigation.goBack()} />}
            <Appbar.Content title={title} />
            {rightAction && (
              <Appbar.Action icon={rightAction.icon} onPress={rightAction.onPress} />
            )}
          </Appbar.Header>
        )}
        {scrollable ? (
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
          >
            <Content />
          </ScrollView>
        ) : (
          <Content />
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  keyboardAvoid: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  scrollContent: {
    flexGrow: 1,
  },
});

export default Screen; 