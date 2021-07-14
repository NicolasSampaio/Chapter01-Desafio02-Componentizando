import { useEffect, useState } from "react";

import { SideBar } from "./components/SideBar";
import { Content } from "./components/Content";

import { Genre } from "./models/genre";
import { Movie } from "./models/movie";

import { api } from "./services/api";

import "./styles/global.scss";

export function App() {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<Genre>({} as Genre);
  const [selectedGenreId, setSelectedGenreId] = useState(1);

  function onGenreSelected(id: number) {
    setSelectedGenreId(id);
  }

  useEffect(() => {
    api.get<Genre[]>("genres").then((response) => {
      setGenres(response.data);
    });
  }, []);

  useEffect(() => {
    api.get<Movie[]>(`movies/?Genre_id=${selectedGenreId}`).then((response) => {
      setMovies(response.data);
    });

    api.get<Genre>(`genres/${selectedGenreId}`).then((response) => {
      setSelectedGenre(response.data);
    });
  }, [selectedGenreId]);

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <SideBar
        genres={genres}
        onGenreSelected={onGenreSelected}
        selectedGenreId={selectedGenreId}
      />
      <Content movies={movies} selectedGenre={selectedGenre} />
    </div>
  );
}
