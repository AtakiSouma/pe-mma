import {
  Button,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Categories } from "../data/data";
import { FlatList } from "react-native";
import { globalStyles } from "../constants/globalStyle";
import { appColor } from "../constants/theme";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { showInfoRemoveToast, showSuccessToast } from "../components/Toast";
import Dialog from "react-native-dialog";

const FavoriteList = () => {
  const [data, setData] = useState(Categories);
  const [bookmarks, setBookmarks] = useState([]);
  const [bookmarksData, setBookmarksData] = useState([]);
  const isFocused = useIsFocused();
  useEffect(() => {
    console.log("bookmarkssssss", bookmarks);
    if (isFocused) {
      const bookmarkedItems = Categories.flatMap(
        (category) => category.items
      ).filter((item) => bookmarks.includes(item.name));
      setBookmarksData(bookmarkedItems);
    }
  }, [isFocused, bookmarks]);

  useFocusEffect(
    React.useCallback(() => {
      AsyncStorage.getItem("bookmarks")
        .then((bookmarksData) => {
          if (bookmarksData !== null) {
            setBookmarks(JSON.parse(bookmarksData));
          }
        })
        .catch((error) => console.error("Error loading bookmarks:", error));
    }, [])
  );
  const removeAllBookmarks = async () => {
    try {
      await AsyncStorage.removeItem("bookmarks");

      setBookmarks([]);
      showInfoRemoveToast();
    } catch (error) {
      console.error("Error removing bookmarks: ", error);
    }
  };

  const handleDeleteItem = (itemName) => {
    const updatedBookmarks = bookmarks.filter((name) => name !== itemName);
    setBookmarks(updatedBookmarks);
    showInfoRemoveToast();
    AsyncStorage.setItem("bookmarks", JSON.stringify(updatedBookmarks)).catch(
      (error) => console.error("Error saving bookmarks:", error)
    );
  };
  console.log("bookmark in wishlis", bookmarks);
  //TODO: handle modal
  const [visible, setVisible] = useState(false);

  const showDialog = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleDelete = () => {
    removeAllBookmarks();
    setVisible(false);
    showSuccessToast();
  };
  return (
    <View style={{ marginTop: 30, marginLeft: 20 }}>
      <Text style={{ fontSize: 30, fontWeight: "900" }}>WishList Screen</Text>
      <View style={styles.section}>
        <Text>Show {bookmarksData.length} results</Text>
        {bookmarksData.length < 2 ? (
          <></>
        ) : (
          <>
            <Button
              onPress={showDialog}
              title="Delete All"
              color={appColor.primary}
            />
          </>
        )}
      </View>
      {/* data items */}

      <View>
        {bookmarksData.length === 0 ? (
          <View
            style={{marginTop:300 ,alignItems: "center", justifyContent: "center" }}
          >
            <Text>No Items in WishList Screen</Text>
          </View>
        ) : (
          <FlatList
            data={bookmarksData}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <View style={globalStyles.card}>
                <View style={styles.row}>
                  <Image source={{ uri: item.image }} style={styles.image} />
                  <Text style={{ fontSize: 15 }}>{item.name}</Text>
                </View>
                <TouchableOpacity
                  onPress={() => handleDeleteItem(item.name)}
                  style={{ position: "absolute", bottom: 10, right: 10 }}
                >
                  <Text>Delete</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        )}
      </View>
      <Dialog.Container
        headerStyle={{ backgroundColor: "#ffffff" }}
        visible={visible}
        onBackdropPress={handleCancel}
      >
        <Dialog.Title>Delete All Items</Dialog.Title>
        <Dialog.Description>
          Do you want to delete all item in wishlist? You cannot undo this
          action.
        </Dialog.Description>
        <Dialog.Button label="Cancel" onPress={handleCancel} />
        <Dialog.Button label="Delete" onPress={handleDelete} />
      </Dialog.Container>
    </View>
  );
};

export default FavoriteList;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    gap: 20,
  },
  image: {
    width: Dimensions.get("window").width * 0.4,
    height: 120,
    borderRadius: 10,
    resizeMode: "cover",
  },
  section: {
    paddingHorizontal: 16,
    paddingBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    alignItems: "center",
  },
});
