import { Genre } from "../models/genre";
import { Button } from "./Button";

import "../styles/sidebar.scss";

interface SidebarProps {
  genres: Array<Genre>;
  onGenreSelected: (genreId: number) => void;
  selectedGenreId: number;
}

export function SideBar(props: SidebarProps) {
  return (
    <nav className="sidebar">
      <span>
        Watch<p>Me</p>
      </span>

      <div className="buttons-container">
        {props.genres.map((genre) => (
          <Button
            key={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => props.onGenreSelected(genre.id)}
            selected={props.selectedGenreId === genre.id}
          />
        ))}
      </div>
    </nav>
  );
}
