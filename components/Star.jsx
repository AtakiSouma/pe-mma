import { TouchableOpacity, View } from "react-native";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
export const renderStarsAlone = (rate) => {
  const fullStars = Math.floor(rate);
  const fractionalPart = rate - fullStars;

  const stars = [];
  for (let i = 0; i < fullStars; i++) {
    stars.push(<AntDesign key={i} name="star" size={18} color="yellow" />);
  }

  if (fractionalPart >= 0.1 && fractionalPart < 0.9) {
    stars.push(
      <FontAwesome key="half" name="star-half-full" size={24} color="yellow" />
    );
  }

  const remainingStars = 5 - Math.ceil(rate);
  for (let i = 0; i < remainingStars; i++) {
    stars.push(
      <AntDesign key={`empty${i}`} name="staro" size={18} color="yellow" />
    );
  }
  return (
    <TouchableOpacity onPress={() => {}}>
      <View
        style={{
          marginTop: 20,
          flexDirection: "row",
          alignContent: "center",
          alignItems: "center",
        }}
      >
        {stars}
      </View>
    </TouchableOpacity>
  );
};
