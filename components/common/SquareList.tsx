import {
  Image,
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { router } from "expo-router";

interface Content {
  adult?: boolean;
  backdrop_path?: string;
  genre_ids?: number[];
  genres?: { id: number; name: string }[];
  id: number;
  original_language?: string;
  original_title?: string;
  overview?: string;
  popularity?: number;
  poster_path?: string;
  release_date?: string;
  first_air_date?: string;
  title?: string;
  name?: string;
  video?: boolean;
  vote_average?: number;
  vote_count?: number;
  media_type?: "movie" | "tv";
}

const SquareList = ({
  contents,
  title,
}: {
  contents: Content[] | undefined;
  title: string;
}) => {
  const titleMap: { [key: string]: string } = {
    "/movie/popular": "Popular on Netflix",
    "/movie/top_rated": "Trending now",
    "/movie/now_playing": "Top 10 in Nigeria Today",
    "/movie/upcoming": "My List",
    "/tv/airing_today": "Netflix Originals",
  };

  // 경로를 사람이 읽을 수 있는 제목으로 변환
  const displayTitle = titleMap[title] || "Unknown Title";

  if (!contents || contents.length === 0) {
    return null;
  }

  return (
    <View style={styles.background}>
      <Text style={styles.title}>{displayTitle}</Text>
      <ScrollView
        horizontal // 가로 스크롤 활성화
        showsHorizontalScrollIndicator={false} // 스크롤바 숨기기
        contentContainerStyle={styles.scrollContent} // 내부 컨텐츠 스타일 적용
      >
        {contents.map((content, index) => (
          <View style={styles.card}>
            <TouchableOpacity
              onPress={() =>
                router.push({ pathname: "/detail", params: { id: content.id } })
              }
            >
              <Image
                key={index}
                source={{
                  uri: `https://image.tmdb.org/t/p/original${content.poster_path}`,
                }}
                resizeMode="cover"
                style={styles.card}
              />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default SquareList;

const styles = StyleSheet.create({
  background: {
    width: "100%",
    justifyContent: "center",
  },
  title: {
    color: "white",
    fontSize: 30,
    fontWeight: "600",
  },
  scrollContent: {
    flexDirection: "row",
    marginTop: 20,
  },
  card: {
    width: 103,
    height: 161,
    borderRadius: 4,
    marginRight: 10,
  },
});
