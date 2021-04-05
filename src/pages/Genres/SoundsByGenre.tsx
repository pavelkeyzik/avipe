import { useParams } from "react-router";
import { MainContentLayout } from "../../components/MainContentLayout";
import { SoundPlaylist } from "../../components/SoundPlaylist";
import { useGenre } from "../../core/hooks/use-songs";

function SoundsByGenre() {
  const { id } = useParams();
  const genre = useGenre(+id);

  return (
    <MainContentLayout>
      <h1>Sounds By Genre</h1>
      <SoundPlaylist isLoading={genre.isLoading} songs={genre.data?.songs} />
    </MainContentLayout>
  );
}

export { SoundsByGenre };
