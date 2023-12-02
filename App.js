import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Platform,
  NativeModules,
  Dimensions,
  TouchableOpacity,
} from "react-native";
const { StatusBarManager } = NativeModules;
import {
  useFonts,
  IrishGrover_400Regular,
} from "@expo-google-fonts/irish-grover";
import AppLoading from "expo-app-loading";
import { useState } from "react";

const STATUSBAR_HEIGHT = Platform.OS === "ios" ? 20 : StatusBarManager.HEIGHT;

const screenHeight = Dimensions.get("window").height;
export default function App() {
  const [mainOpen, setMainOpen] = useState(true);
  const [scoreboardOpen, setScoreboardOpen] = useState(false);

  let [fontsLoaded] = useFonts({
    IrishGrover_400Regular,
  });

  function changeToScoreBoard() {
    setScoreboardOpen(true);
    setMainOpen(false);
  }
  function changeToMain() {
    setScoreboardOpen(false);
    setMainOpen(true);
  }

  return (
    <>
      {!fontsLoaded && <AppLoading />}
      {mainOpen && <MainPage changeToScoreBoard={changeToScoreBoard} />}
      {scoreboardOpen && <ScoreboardPage changeToMain={changeToMain} />}
    </>
  );
}
function MainPage({ changeToScoreBoard }) {
  const styles = StyleSheet.create({
    containerMain: {
      flex: 1,
      backgroundColor: "#212529",
      top: STATUSBAR_HEIGHT,
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
    },
    h1: {
      fontSize: 64,
      fontFamily: "IrishGrover_400Regular",
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
    },
  });
  return (
    <View style={styles.containerMain}>
      <View style={styles.containerName}>
        <Text style={[styles.containerNameText, styles.h1]}>WORDO</Text>
        <Text style={[styles.containerNameText, styles.h2]}>The game</Text>
      </View>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>New game</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => changeToScoreBoard()}
      >
        <Text style={styles.buttonText}>Scoreboard</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}

function ScoreboardPage({ changeToMain }) {
  const styles = StyleSheet.create({
    containerMain: {
      flex: 1,
      backgroundColor: "#212529",
      alignItems: "center",
      justifyContent: "center",
    },
    containerName: {
      flex: 0.2,
      width: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    containerNameText: {
      color: "#D9D9D9",
    },
    h1: {
      fontSize: 64,
      fontFamily: "IrishGrover_400Regular",
      letterSpacing: 15,
    },
    h2: { fontSize: 32 },
    button: {
      flex: 0.05,
      backgroundColor: "#D9D9D9",
      width: "75%",
      display: "flex",
      justifyContent: "center",
      borderRadius: 45,
    },
    containerScoreboard: {
      flex: 0.6,
      width: "90%",
    },
  });
  const scoreboard = [
    { id: 0, name: "Krzysiek", score: 8300 },
    { id: 1, name: "Paweł", score: 6000 },
    { id: 2, name: "Ania", score: 5700 },
    { id: 3, name: "Oliwia", score: 5300 },
    { id: 4, name: "Dominik", score: 4100 },
    { id: 5, name: "Agnieszka", score: 3700 },
    { id: 6, name: "Tomek", score: 3400 },
    { id: 7, name: "Grzesiek", score: 2700 },
    { id: 8, name: "Dominika", score: 2200 },
    { id: 9, name: "Jurek", score: 1900 },
  ];
  return (
    <View style={styles.containerMain}>
      <View style={styles.containerName}>
        <Text style={[styles.containerNameText, styles.h1]}>WORDO</Text>
        <Text style={[styles.containerNameText, styles.h2]}>The game</Text>
      </View>
      <View style={styles.containerScoreboard}>
        {scoreboard.map((i) => Row((i = { i })))}
      </View>
      <TouchableOpacity style={styles.button} onPress={() => changeToMain()}>
        <Text style={{ textAlign: "center", fontWeight: "700" }}>
          BACK TO MAIN PAGE
        </Text>
      </TouchableOpacity>
    </View>
  );
}

function Row({ i }) {
  const styles = StyleSheet.create({
    containerScores: {
      display: "flex",
      flexDirection: "row",
      flex: 0.08,
      borderColor: "white",
      borderWidth: 1,
      alignItems: "center",
      justifyContent: "space-around",
      width: "100%",
    },
    containerScoresText: {
      color: "#d9d9d9",
      fontWeight: "700",
      textAlign: "center",
    },
    index: {
      flex: 0.2,
    },
    name: {
      flex: 0.5,
    },
    score: {
      flex: 0.2,
    },
  });
  return (
    <View style={styles.containerScores} key={i.id}>
      <View style={styles.index}>
        <Text style={styles.containerScoresText}>{i.id + 1}</Text>
      </View>
      <View style={styles.name}>
        <Text style={styles.containerScoresText}>{i.name}</Text>
      </View>
      <View style={styles.score}>
        <Text style={styles.containerScoresText}>{i.score}</Text>
      </View>
    </View>
  );
}
