import { useCallback, useState } from "react";
import { View } from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import AppLoading from "expo-app-loading";
import { MainPage } from "./MainPage";
import { GamePage } from "./GamePage";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [mainOpen, setMainOpen] = useState(true);
  const [gameOpen, setGameOpen] = useState(false);

  const [fontsLoaded] = useFonts({
    IrishGrover: require("./assets/IrishGrover-Regular.ttf"),
    Montserrat: require("./assets/Montserrat-VariableFont_wght.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);
  if (!fontsLoaded) {
    return null;
  }

  function changeContects(contects) {
    setMainOpen(false);
    setGameOpen(false);
    switch (contects) {
      case "game":
        setGameOpen(true);
        break;
      case "main":
        setMainOpen(true);
        break;
    }
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      {!fontsLoaded && <AppLoading />}
      {mainOpen && <MainPage changeContects={changeContects} />}
      {gameOpen && <GamePage changeContects={changeContects} />}
    </View>
  );
}
