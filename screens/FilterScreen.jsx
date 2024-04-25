import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Categories } from "../data/data";
import { globalStyles } from "../constants/globalStyle";
import { useFocusEffect } from "@react-navigation/native";
import { appColor } from "../constants/theme";
import { Picker } from "@react-native-picker/picker";

import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ForceTouchGestureHandler } from "react-native-gesture-handler";
const FilterScreen = ({ navigation }) => {
  const [filterData, setFilterData] = useState(Categories);
  useFocusEffect(
    React.useCallback(() => {
      const data = Categories.flatMap((category) => category.items).filter(
        (item) => item.isTopOfTheWeek === true
      );
      setFilterData(data);
    }, [])
  );
  const [bookmark, setBookmark] = useState([]);
  useFocusEffect(
    React.useCallback(() => {
      AsyncStorage.getItem("bookmarks")
        .then((value) => {
          if (value !== null) {
            console.log("Bookmar in Filter", value);
            const bookmarksArray = JSON.parse(value);
            setBookmark(bookmarksArray);
          } else {
            setBookmark([]);
          }
        })
        .catch((error) => console.error("Error retrieving bookmarks: ", error));
    }, [])
  );
  const handleAscending = () => {
    const data = Categories.flatMap((category) => category.items).filter(
      (item) => item.isTopOfTheWeek === true
    );
    const sortAsc = [...data].sort((a, b) => a.price - b.price);
    setFilterData(sortAsc);
  };
  const handleDescending = () => {
    const data = Categories.flatMap((category) => category.items).filter(
      (item) => item.isTopOfTheWeek === true
    );
    const sortDesc = [...data].sort((a, b) => b.price - a.price);
    setFilterData(sortDesc);
  };
  // const [selected, setSelected] = useState("");

  // useEffect(() => {
  //   const data = Categories.flatMap((category) => category.items).filter(
  //     (item) => item.isTopOfTheWeek === true
  //   );
  //   if (selected === "all") {
  //     setFilterData(data);
  //   }
  //   const selectColorData = data.filter((item) => item.color === selected);
  //   setFilterData(selectColorData);
  // }, [setFilterData, selected]);

  return (
    <View style={{ marginTop: 30, marginLeft: 20 }}>
      <Text style={{ fontSize: 30, fontWeight: "900" }}>FIlter Screen</Text>
      <View style={{ flexDirection: "row", gap: 20, alignItems: "center" }}>
        <Text>Price:</Text>
        <TouchableOpacity style={styles.tag} onPress={() => handleAscending()}>
          <Text style={{ color: appColor.white }}>Ascending</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tag} onPress={() => handleDescending()}>
          <Text style={{ color: appColor.white }}> Descending</Text>
        </TouchableOpacity>
      </View>

      {/* <Picker
        selectedValue={selected}
        onValueChange={(itemValue, itemIndex) => setSelected(itemValue)}
      >
        <Picker.Item label="All" value="all" />
        <Picker.Item label="orange" value="orange" />
        <Picker.Item label="pink" value="pink" />
        <Picker.Item label="white" value="white" />
        <Picker.Item label="Yellow" value="Yellow" />
      </Picker> */}

      <Text></Text>
      <Text>Show {filterData.length} results</Text>
      <FlatList
        data={filterData}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate("DetailScreen", { item })}
          >
            <View style={globalStyles.card}>
              <View style={styles.cardStyle}>
                <Image source={{ uri: item.image }} style={styles.image} />
                <View style={{ marginTop: 20 }}>
                  <Text>Name: {item.name} f</Text>
                  <Text>Price: {item.price} $</Text>
                  <Text>Origin: {item.origin}</Text>
                </View>
              </View>
            </View>
            <View style={styles.topWeek}>
              <Text style={{ color: appColor.whiteCard }}>Top Week</Text>
            </View>
            <View style={styles.buttonLove}>
              <AntDesign
                name="heart"
                size={30}
                color={
                  bookmark.includes(item.name)
                    ? appColor.danger2
                    : appColor.black
                }
              />
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default FilterScreen;

const styles = StyleSheet.create({
  tag: {
    padding: 5,
    borderRadius: 5,
    backgroundColor: appColor.secondary,
  },
  image: {
    width: Dimensions.get("window").width * 0.4,
    height: 120,
    borderRadius: 10,
    resizeMode: "cover",
  },
  topWeek: {
    padding: 5,
    backgroundColor: appColor.primary,
    borderRadius: 20,
    position: "absolute",
    top: 10,
    left: 10,
  },
  cardStyle: {
    flexDirection: "row",
    gap: 10,
  },
  buttonLove: {
    padding: 5,
    backgroundColor: "#ffffff",
    borderRadius: 5,
    position: "absolute",
    right: 20,
    bottom: 20,
  },
});
