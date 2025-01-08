export interface Content {
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
