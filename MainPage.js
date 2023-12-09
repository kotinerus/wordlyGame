import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  NativeModules,
} from "react-native";
const { StatusBarManager } = NativeModules;
const STATUSBAR_HEIGHT = Platform.OS === "ios" ? 20 : StatusBarManager.HEIGHT;

export function MainPage({ changeContects }) {
  const styles = StyleSheet.create({
    containerMain: {
      flex: 1,
      backgroundColor: "#212529",
      alignItems: "center",
      justifyContent: "center",
    },
    containerName: {
      flex: 0.3,
      width: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    containerNameText: {
      color: "#D9D9D9",
      fontFamily: "IrishGrover",
    },
    h1: {
      fontSize: 64,
      letterSpacing: 15,
    },
    h2: { fontSize: 32 },
    button: {
      marginTop: 10,
      flex: 0.075,
      backgroundColor: "#D9D9D9",
      width: "75%",
      display: "flex",
      justifyContent: "center",
      borderRadius: 45,
    },
    buttonText: {
      alignSelf: "center",
      fontSize: 16,
      fontWeight: "700",
      textTransform: "uppercase",
      fontFamily: "Montserrat",
    },
  });
  return (
    <View style={styles.containerMain}>
      <View style={styles.containerName}>
        <Text style={[styles.containerNameText, styles.h1]}>WORDO</Text>
        <Text style={[styles.containerNameText, styles.h2]}>The game</Text>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => changeContects("game")}
      >
        <Text style={styles.buttonText}>New game</Text>
      </TouchableOpacity>
    </View>
  );
}
