import {
  Button,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import AsyncStorage, {
  useAsyncStorage,
} from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { Categories } from "../data/data";
import { appColor } from "../constants/theme";
import { globalStyles } from "../constants/globalStyle";
import { Dimensions } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { showInfoRemoveToast, showSuccessToast } from "../components/Toast";
const HomeScreen = ({ navigation }) => {
  const [data, setData] = useState(Categories);
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  // TODO:function set default is All categories
  useFocusEffect( 
    React.useCallback(() => {
      setSelectedCategory("All Categories")
    },[])
  )
  const handleCategoryClick = (categoryName) => {
    setSelectedCategory(
      categoryName === selectedCategory ? null : categoryName
    );
  };
  // TODO:set filter items
  const filteredItems = selectedCategory
    ? selectedCategory === "All Categories"
      ? Categories.flatMap((category) => category.items)
      : Categories.find((category) => category.name === selectedCategory).items
    : [];
  // TODO:handle change color
  const isCategorySelected = (categoryName) =>
    selectedCategory === categoryName;
  // TODO: handle bookmark AddToWishList
  // Define save
  const [bookmark, setBookmark] = useState([]);
  useFocusEffect(
    React.useCallback(() => {
      AsyncStorage.getItem("bookmarks")
        .then((value) => {
          if (value !== null) {
            console.log("Bookmar in starge", value);
            const bookmarksArray = JSON.parse(value);
            setBookmark(bookmarksArray);
          } else {
            setBookmark([]);
          }
        })
        .catch((error) => console.error("Error retrieving bookmarks: ", error));
    }, [])
  );
  // handle Toggle BookMark
  const toggleBookmark = (itemName) => {
    const updatedBookmarks = [...bookmark];
    const index = updatedBookmarks.indexOf(itemName);
    if (index !== -1) {
      updatedBookmarks.splice(index, 1);
      showInfoRemoveToast();
    } else {
      updatedBookmarks.push(itemName);
      showSuccessToast();
    }
    setBookmark(updatedBookmarks);
    AsyncStorage.setItem("bookmarks", JSON.stringify(updatedBookmarks)).catch(
      (error) => console.error("Error saving bookmarks:", error)
    );
  };
  console.log("bookmark", bookmark);
  return (
    <View style={styles.container}>
      <View style={{ padding:20, backgroundColor: appColor.whiteCard }}>
        <FlatList
          data={[{ name: "All Categories" }, ...Categories]}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.rowComponent,
                isCategorySelected(item.name) && styles.selectedCategory,
              ]}
              onPress={() => handleCategoryClick(item.name)}
            >
              <Text
                style={[
                  styles.textStyle,
                  isCategorySelected(item.name) && styles.selectedText,
                ]}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
      <View style={{flex:1,paddingBottom:50}}>
        <FlatList
          data={filteredItems}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          ListHeaderComponent={() => (
            <Text style={globalStyles.section}>
              Show {filteredItems.length} results for{" "}
              {selectedCategory || "All Categories"}
            </Text>
          )}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              onPress={() => navigation.navigate("DetailScreen", { item })}
            >
              <View style={globalStyles.card}>
                <Image source={{ uri: item.image }} style={styles.imageStyle} />
                <Text
                  style={{
                    padding: 2,
                    fontSize: 15,
                    fontWeight: "400",
                    marginTop: 5,
                  }}
                >
                  {item.name}
                </Text>
                <TouchableOpacity
                  style={styles.buttonLove}
                  onPress={() => toggleBookmark(item.name)}
                >
                  <MaterialIcons
                    name="favorite"
                    size={30}
                    color={
                      bookmark.includes(item.name)
                        ? appColor.danger2
                        : appColor.secondary
                    }
                  />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  buttonLove: {
    position: "absolute",
    top: 15,
    right: 15,
    padding: 5,
    backgroundColor: "#ffffffB3",
    borderRadius: 10,
  },
  container: {
    height:"auto",
    marginTop:20,
    flex:1,
    marginBottom:12,
  },
  rowComponent: {
    padding: 10,
    backgroundColor: appColor.gray,
    marginLeft: 10,
    borderRadius: 10,
  },
  textStyle: {
    fontSize: 18,
  },
  imageStyle: {
    width: Dimensions.get("window").width * 0.4,
    height: 120,
    borderRadius: 10,
    resizeMode: "cover",
  },
  selectedCategory: {
    backgroundColor: appColor.primary,
  },
  selectedText: {
    color: "white",
  },
});
