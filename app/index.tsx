import { View, StyleSheet, ScrollView } from "react-native";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import { useState, useEffect } from "react";
import SquareList from "@/components/common/SquareList";
import { Content } from "@/assets/types/type";

export const getContents = async (category: string): Promise<Content[]> => {
  const url = `https://api.themoviedb.org/3${category}?language=en-US&page=1&api_key=c7d92070b9a0270d0cb9206d1c8be258`;
  const res = await fetch(url);
  const data = await res.json();
  return data.results;
};

interface SquareListItem {
  contents: Content[];
  title: string;
}

export default function App() {
  const categories = [
    "/movie/popular",
    "/movie/top_rated",
    "/movie/now_playing",
    "/movie/upcoming",
    "/tv/airing_today",
  ];

  const [squareListData, setSquareListData] = useState<SquareListItem[]>([]);

  useEffect(() => {
    const fetchContents = async () => {
      const data = await Promise.all(
        categories.map(async (category) => {
          const contents = await getContents(category);
          return { title: category, contents };
        })
      );
      setSquareListData(data);
    };

    fetchContents();
  }, []);

  return (
    <View style={styles.background}>
      <Header />
      <ScrollView
        style={styles.listBox}
        contentContainerStyle={{ paddingLeft: 30 }}
        showsVerticalScrollIndicator={false} // 스크롤바 숨기기
      >
        {squareListData.map((data, index) => (
          <SquareList key={index} contents={data.contents} title={data.title} />
        ))}
      </ScrollView>
      <Footer tab={1} />
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
  listBox: {
    width: "100%",
    height: 655,
    marginTop: 40,
  },
});
