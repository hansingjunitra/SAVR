
import React, { useCallback } from "react";
import { Alert, Button, Linking, StyleSheet, View } from "react-native";
import { Title } from "react-native-paper";

const SendIntentButton = ({ action, extras, children }) => {
  const handlePress = useCallback(async () => {
    try {
      await Linking.sendIntent(action, extras);
    } catch (e) {
      Alert.alert(e.message);
    }
  }, [action, extras]);

  return <Button title={children} onPress={handlePress} />;
};

var SendIntentAndroid = require("react-native-send-intent");

const App = () => {
  return (
    <View style={styles.container}>
      <SendIntentButton action="android.intent.action.POWER_USAGE_SUMMARY">
        Power Usage Summary
      </SendIntentButton>
      <SendIntentButton
        action="android.settings.APP_NOTIFICATION_SETTINGS"
        extras={[
          { "android.provider.extra.APP_PACKAGE": "com.facebook.katana" },
        ]}
      >
        App Notification Settings
      </SendIntentButton>
      {/* <Button onPress = {() => SendIntentAndroid.openApp("com.google.android.apps.nbu.paisa.user4").then(wasOpened => {})} title = 'test'>
          gmail
        </Button> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
});

