import { useLocalSearchParams } from "expo-router";
import { View, Text, Image, TextInput, StyleSheet, Button } from "react-native";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Content {
  id: number;
  title?: string;
  name?: string;
  overview?: string;
  poster_path?: string;
  release_date?: string;
  first_air_date?: string;
}

const fetchContent = async (id: number): Promise<Content> => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?language=en-US&api_key=c7d92070b9a0270d0cb9206d1c8be258`
  );
  const data = await response.json();
  return data;
};

export default function Detail() {
  const { id } = useLocalSearchParams();
  const [content, setContent] = useState<Content | null>(null);
  const [review, setReview] = useState<string>("");

  const saveReview = async () => {
    await AsyncStorage.setItem("review", review);
    window.localStorage.setItem("review", review);
  };

  const getReview = async () => {
    //const savedreview = await AsyncStorage.getItem(`review-${id}`);
    const savedreview = window.localStorage.getItem(`review`);
    setReview(savedreview ?? "");
  };

  useEffect(() => {
    if (id) {
      fetchContent(Number(id)).then(setContent);
      getReview();
    }
  }, [id]);

  if (!content) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: `https://image.tmdb.org/t/p/original${content.poster_path}`,
        }}
        style={styles.poster}
      />
      <Text style={styles.title}>{content.title || content.name}</Text>
      <Text style={styles.overview}>{content.overview}</Text>
      <Text style={styles.releaseDate}>
        Release Date: {content.release_date || content.first_air_date}
      </Text>
      <Text style={styles.reviewLabel}>감상평을 남겨보세요</Text>
      <TextInput
        style={styles.input}
        placeholder="감상평을 입력하세요"
        placeholderTextColor="gray"
        value={review}
        onChangeText={setReview}
        multiline
      />
      <Button title="SAVE" onPress={saveReview} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    padding: 20,
  },
  poster: {
    width: "100%",
    height: 300,
    borderRadius: 10,
    marginBottom: 20,
  },
  title: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  overview: {
    color: "white",
    fontSize: 16,
    marginBottom: 10,
  },
  releaseDate: {
    color: "gray",
    fontSize: 14,
    marginBottom: 40,
  },
  error: {
    color: "red",
    fontSize: 18,
    textAlign: "center",
  },
  reviewLabel: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    backgroundColor: "#333",
    color: "white",
    fontSize: 16,
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
});
