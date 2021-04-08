import styled from "@emotion/styled";
import { motion } from "framer-motion";
import { PropsWithChildren } from "react";
import { useParams } from "react-router";
import { PlayCircleIcon } from "../components/icons/PlayCircle";
import { PlaylistContentLayout } from "../components/PlaylistContentLayout";
import { SoundPlaylist } from "../components/SoundPlaylist";
import { usePlayer } from "../core/hooks/use-player";
import { usePlaylist } from "../core/hooks/use-songs";
import { Typography } from "../design-system";
import { Button } from "../design-system/Button";

const variantsText = {
  hidden: { opacity: 0, y: "20px" },
  visible: { opacity: 1, y: 0 },
};

const variantsText2 = {
  hidden: { opacity: 0, y: "30px" },
  visible: { opacity: 1, y: 0 },
};

const variantsPlayButton = {
  hidden: { opacity: 0, y: "60px" },
  visible: { opacity: 1, y: 0 },
};

const variantsPlaylistCover = {
  hidden: { opacity: 0, scale: 1.05 },
  visible: { opacity: 1, scale: 1 },
};

function Playlist() {
  const { id } = useParams();
  const player = usePlayer();
  const playlistInfo = usePlaylist(+id);

  function playPlaylist() {
    const songToPlay = playlistInfo.data.songs[0];

    if (songToPlay) {
      player.playSelectedSong(songToPlay, playlistInfo.data.songs);
    }
  }

  return (
    <div>
      <PlaylistHeader>
        <TextWithAnimation variant="title">
          <Title>
            {playlistInfo.data?.name ? (
              <TextWithAnimation variant="title">
                {playlistInfo.data.name}
              </TextWithAnimation>
            ) : (
              "..."
            )}
          </Title>
        </TextWithAnimation>
        <TextWithAnimation variant="description">
          <span>
            {playlistInfo.data?.author ? (
              <TextWithAnimation variant="description">
                Created by {playlistInfo.data.author}
              </TextWithAnimation>
            ) : (
              "..."
            )}
          </span>
        </TextWithAnimation>
        {playlistInfo.data?.songs && playlistInfo.data.songs.length > 0 ? (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={variantsPlayButton}
          >
            <PlayButton onClick={playPlaylist}>
              <PlayCircleIcon /> Listen Songs
            </PlayButton>
          </motion.div>
        ) : null}
        {playlistInfo.data ? (
          <ImageContainer>
            <motion.img
              initial="hidden"
              animate="visible"
              variants={variantsPlaylistCover}
              transition={{ duration: 4 }}
              src={playlistInfo.data.cover_url}
              alt="Playlist Cover"
            />
          </ImageContainer>
        ) : null}
      </PlaylistHeader>
      <PlaylistContentLayout>
        <SongsGrid>
          <Typography.H2>Songs</Typography.H2>
          <SoundPlaylist
            isLoading={playlistInfo.isLoading}
            songs={playlistInfo.data?.songs}
          />
        </SongsGrid>
      </PlaylistContentLayout>
    </div>
  );
}

type TextWithAnimationProps = {
  variant: "title" | "description";
};

function TextWithAnimation(props: PropsWithChildren<TextWithAnimationProps>) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={props.variant === "title" ? variantsText : variantsText2}
    >
      {props.children}
    </motion.div>
  );
}
const PlaylistHeader = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 360px;
`;

const ImageContainer = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: -1;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.4);

  ::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to bottom, transparent, #16161f);
  }

  img {
    position: absolute;
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
`;

const Title = styled(Typography.H1)`
  margin: 0;
  text-align: center;
`;

const PlayButton = styled(Button)`
  margin-top: 32px;
`;

const SongsGrid = styled.div`
  display: flex;
  flex-direction: column;

  & > *:not(:last-child) {
    margin-bottom: 20px;
  }
`;

export { Playlist };
