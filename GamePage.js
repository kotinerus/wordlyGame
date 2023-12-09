import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  NativeModules,
} from "react-native";
import uuid from "react-native-uuid";
import { useEffect, useState } from "react";
const { StatusBarManager } = NativeModules;
const STATUSBAR_HEIGHT = Platform.OS === "ios" ? 20 : StatusBarManager.HEIGHT;

export function GamePage({ changeContects }) {
  const [word, setWord] = useState([]);
  const [lettersArr, setLettersArr] = useState([]);
  const [playerGuess, setPlayerGuess] = useState(["", "", "", "", ""]);
  const [wordsInfo, setWordsInfo] = useState([]);
  const [lives, setLives] = useState(0);
  const [tries, setTries] = useState([]);
  const [gameStatusEnd, setGameStatusEnd] = useState("");

  async function fetchAPI() {
    const response = await fetch(
      "https://random-word-api.vercel.app/api?words=1&length=5"
    );
    const json = await response.json();
    // prettier-ignore
    let alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    let newWordsArray = [...json[0]];
    alphabet = alphabet.filter((letter) => !newWordsArray.includes(letter));
    for (let i = 0; i < 9; i++) {
      const randomIndex = Math.floor(Math.random() * alphabet.length);
      const randomLetter = alphabet[randomIndex];
      newWordsArray = [...newWordsArray, randomLetter];
      alphabet.splice(randomIndex, 1);
    }
    const randomSort = () => Math.random() - 0.5;
    setWord(...json);
    let setOfChars = new Set(newWordsArray.sort(randomSort));

    if (setOfChars.size === 14) {
      setLettersArr([...setOfChars]);
    } else {
      for (let i = 0; i < 14 - setOfChars.size; i++) {
        setOfChars = [...setOfChars, alphabet[0]];
        setLettersArr(setOfChars);
      }
    }
  }
  useEffect(() => {
    fetchAPI();
  }, []);
  useEffect(
    function () {
      lives === 5 ? newChance() : "";
    },
    [lives]
  );
  useEffect(
    function () {
      tries.length === 5 ? setGameStatusEnd(false) : "";
    },
    [tries]
  );
  function resetGame() {
    setLives(0);
    setTries([]);
    setGameStatusEnd("");
    setPlayerGuess(["", "", "", "", ""]);
    fetchAPI();
  }
  function newChance() {
    const wartosci = playerGuess.map((item) => item.letter);
    wartosci.join("") === word ? setGameStatusEnd(true) : "";
    setTries([...tries, playerGuess]);
    setLives(0);
    setPlayerGuess(["", "", "", "", ""]);
  }
  function getAllIndexes(arr, val) {
    var indexes = [],
      i;
    for (i = 0; i < arr.length; i++) if (arr[i] === val) indexes.push(i);
    return indexes;
  }
  useEffect(() => {
    const itemsArr = lettersArr.map((item) => ({
      id: uuid.v4(),
      letter: item,
      isWinningWord: word.includes(item),
      visible: false,
      position: word.includes(item) ? getAllIndexes([...word], item) : "",
    }));
    setWordsInfo(itemsArr);
  }, [lettersArr]);

  function handleGuessNumber(element) {
    word[lives] === element.letter
      ? ((element.mark = true), (element.backgroundColor = "green"))
      : "";
    playerGuess[lives] = element;
    setPlayerGuess(playerGuess);
    setLives((lives) => lives + 1);
  }

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
    },
    containerGame: {
      flex: 0.5,

      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "90%",
    },
    containerButtons: {
      flex: 0.2,
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      gap: 4,
      margin: "3%",
    },
  });
  return (
    <View style={styles.containerMain}>
      <View style={styles.containerName}>
        <Text style={[styles.containerNameText, styles.h1]}>WORDO</Text>
        <Text style={[styles.containerNameText, styles.h2]}>The game</Text>
      </View>

      {gameStatusEnd !== "" && (
        <EndBanner
          tries={tries.length}
          changeContects={changeContects}
          gameStatusEnd={gameStatusEnd}
          newGame={newChance}
          handleResetGame={resetGame}
        />
      )}

      <View style={styles.containerGame}>
        {console.log(word)}
        {tries.map((item, index) => (
          <Row itemObject={item} key={index} />
        ))}
        {!gameStatusEnd && <TryRow word={playerGuess} />}
      </View>
      <View style={styles.containerButtons}>
        {wordsInfo.map((item) => (
          <LetterButton
            key={item.id}
            item={item}
            handleGuessNumber={handleGuessNumber}
          />
        ))}
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => changeContects("main")}
      >
        <Text style={{ textAlign: "center", fontWeight: "700" }}>
          BACK TO MAIN PAGE
        </Text>
      </TouchableOpacity>
    </View>
  );
}
function Row({ itemObject }) {
  const styles = StyleSheet.create({
    Row: {
      backgroundColor: "#212529",
      display: "flex",
      flexDirection: "row",
      width: "100%",
      height: "20%",
      alignItems: "center",
      justifyContent: "center",
      gap: 4,
    },
    Item: {
      flex: 0.2,
      height: "90%",
      textAlign: "center",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#D9D9D9",
      borderRadius: 10,
    },
    Text: {
      textTransform: "uppercase",
      fontWeight: "700",
      fontFamily: "Montserrat",
    },
    visible: {
      backgroundColor: "green",
    },
  });
  return (
    <View style={styles.Row}>
      {[...itemObject].map((item, index) => (
        <View
          key={uuid.v4()}
          style={[
            styles.Item,
            [...item.position].includes(index)
              ? { backgroundColor: "green" }
              : { backgroundColor: "#D9D9D9" },
          ]}
        >
          <Text key={uuid.v4()} style={styles.Text}>
            {item.letter}
          </Text>
        </View>
      ))}
    </View>
  );
}
function TryRow({ word }) {
  const styles = StyleSheet.create({
    Row: {
      backgroundColor: "#212529",
      display: "flex",
      flexDirection: "row",
      width: "100%",
      height: "20%",
      alignItems: "center",
      justifyContent: "center",
      gap: 4,
    },
    Item: {
      flex: 0.2,
      height: "90%",
      textAlign: "center",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#D9D9D9",
      borderRadius: 10,
    },
    Text: {
      textTransform: "uppercase",
      fontWeight: "700",
      fontFamily: "Montserrat",
    },
    visible: {
      backgroundColor: "green",
    },
  });
  return (
    <View style={styles.Row}>
      {[...word].map((item, index) => (
        <View
          key={uuid.v4()}
          style={
            item !== ""
              ? [...item?.position].includes(index)
                ? [styles.Item, styles.visible]
                : styles.Item
              : styles.Item
          }
        >
          <Text key={uuid.v4()} style={styles.Text}>
            {item.letter}
          </Text>
        </View>
      ))}
    </View>
  );
}
function LetterButton({ item, handleGuessNumber }) {
  const styles = StyleSheet.create({
    touchable: {
      width: "12%",
      height: "48%",
      backgroundColor: "#D9D9D9",
      display: "flex",
      justifyContent: "center",
      alignContent: "center",
      borderRadius: 16,
    },
    touchable_text: {
      textAlign: "center",
      fontWeight: "700",
      fontSize: 20,
      textTransform: "uppercase",
      fontFamily: "Montserrat",
    },
  });
  return (
    <TouchableOpacity
      style={styles.touchable}
      onPress={() => handleGuessNumber(item)}
    >
      <Text style={styles.touchable_text}>{item.letter}</Text>
    </TouchableOpacity>
  );
}
function EndBanner({ tries, changeContects, gameStatusEnd, handleResetGame }) {
  const styles = StyleSheet.create({
    BannerView: {
      display: "flex",
      position: "absolute",
      justifyContent: "center",
      alignContent: "center",
      top: STATUSBAR_HEIGHT,
      width: "100%",
      height: "100%",

      zIndex: 1,
    },
    red: {
      backgroundColor: "red",
    },
    green: {
      backgroundColor: "green",
    },
    BannerViewH1: {
      fontWeight: "800",
      textAlign: "center",
      textTransform: "uppercase",
      fontSize: 32,
    },
    BannerViewH2: {
      padding: 20,
      fontWeight: "600",
      textAlign: "center",
      textTransform: "uppercase",
      fontSize: 16,
    },
    button: {
      marginTop: 10,
      position: "relative",
      left: "15%",
      bottom: "0px",
      flex: 0.075,
      backgroundColor: "#D9D9D9",
      width: "75%",
      display: "flex",
      justifyContent: "center",
      borderRadius: 45,
    },
  });
  return (
    <View
      style={[gameStatusEnd ? styles.green : styles.red, styles.BannerView]}
    >
      <Text style={styles.BannerViewH1}>
        {gameStatusEnd ? "You won" : "You lose"}
      </Text>
      {gameStatusEnd && (
        <Text style={styles.BannerViewH2}>{`In ${tries} tries`}</Text>
      )}
      <TouchableOpacity style={styles.button} onPress={() => handleResetGame()}>
        <Text style={{ textAlign: "center", fontWeight: "700" }}>NEW GAME</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => changeContects("main")}
      >
        <Text style={{ textAlign: "center", fontWeight: "700" }}>
          BACK TO MAIN PAGE
        </Text>
      </TouchableOpacity>
    </View>
  );
}
