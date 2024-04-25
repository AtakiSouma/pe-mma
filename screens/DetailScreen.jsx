import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import HeaderComponent from "../components/HeaderComponent";
import { MaterialIcons } from "@expo/vector-icons";
import { appColor } from "../constants/theme";
import { globalStyles } from "../constants/globalStyle";
import { renderStarsAlone } from "../components/Star";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { showInfoRemoveToast, showSuccessToast } from "../components/Toast";
const DetailScreen = ({ navigation, route }) => {
  const { item } = route.params;
  const [isBookmarked, setIsBookmarked] = useState(false);
  //TODO: fetch bookmarked
  useEffect(() => {
    AsyncStorage.getItem("bookmarks")
      .then((value) => {
        if (value !== null) {
          const bookmarksArray = JSON.parse(value);
          setIsBookmarked(bookmarksArray.includes(item.name.toString()));
        }
      })
      .catch((error) => console.error("Error retrieving bookmarks: ", error));
  }, []);
  //TODO: Function to toggle bookmark status
  const toggleBookmark = () => {
    AsyncStorage.getItem("bookmarks")
      .then((value) => {
        let bookmarksArray = [];
        if (value !== null) {
          bookmarksArray = JSON.parse(value);
        }
        const updatedBookmarks = isBookmarked
          ? bookmarksArray.filter(
              (bookmarkName: any) => bookmarkName !== item.name.toString()
            )
          : [...bookmarksArray, item.name.toString()];
        AsyncStorage.setItem("bookmarks", JSON.stringify(updatedBookmarks));
      })
      .then(() => {
        setIsBookmarked(!isBookmarked);
        if (isBookmarked === false) {
          showSuccessToast();
        } else {
          showInfoRemoveToast();
        }
      })
      .catch((error) =>
        console.error("Error updating bookmarks in AsyncStorage: ", error)
      );
  };
  return (
    <View style={{ flex: 1 }}>
      <HeaderComponent
        handleGoHome={() => navigation.navigate("Home")}
        handleGoBack={() => navigation.goBack()}
      />
      <View>
        <Image
          source={{ uri: item.image }}
          style={{
            width: Dimensions.get("window").width * 0.9,
            height: 300,
            resizeMode: "cover",
            borderRadius: 10,
            marginLeft: 19,
            marginVertical: 20,
          }}
        />
        <TouchableOpacity style={styles.buttonLove} onPress={() => toggleBookmark()}>
          <MaterialIcons
            name="favorite"
            size={30}
            color={isBookmarked ? appColor.danger2 : appColor.black}
          />
        </TouchableOpacity>
      </View>
      <View style={globalStyles.section}>
        <Text style={{ fontSize: 30, fontWeight: "600" }}>{item.name}</Text>
      </View>
      <View style={globalStyles.section}>
        <View style={{ flexDirection: "row", gap: 20 }}>
          <Text style={{ fontSize: 20, fontWeight: "400" }}>
            Weight: <Text style={{ color: appColor.gray }}> {item.weight}</Text>
          </Text>
          <Text style={{ fontSize: 20, fontWeight: "400" }}>
            Price :<Text style={{ color: appColor.gray }}> {item.price}</Text>
          </Text>
        </View>
      </View>
      <View style={globalStyles.section}>
        <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
          <Text style={{ fontSize: 20, fontWeight: "400" }}>Color</Text>
          <View
            style={{
              padding: 20,
              borderRadius: 9999,
              backgroundColor: item.color,
            }}
          />
        </View>
      </View>
      <View style={globalStyles.section}>
        <Text style={{ fontSize: 20, fontWeight: "400" }}>
          Bonus :
          <Text style={{ color: appColor.gray, marginRight: 20 }}>
            {item.bonus}
          </Text>
        </Text>
      </View>
      <View style={globalStyles.section}>
        <Text style={{ fontSize: 20, fontWeight: "400" }}>
          Origin :
          <Text style={{ color: appColor.gray, marginRight: 20 }}>
            {item.origin}
          </Text>
        </Text>
      </View>
      <View style={globalStyles.section}>
        <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
          <Text style={{ fontSize: 20, fontWeight: "400" }}>Rate :</Text>
          <View style={{ marginBottom: 20 }}>
            <Text>{renderStarsAlone(item.rating)}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({
  buttonLove: {
    position: "absolute",
    top: 35,
    right: 35,
    padding: 5,
    backgroundColor: "#ffffffB3",
    borderRadius: 10,
  },
});
