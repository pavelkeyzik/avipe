import React from "react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { motion } from "framer-motion";
import { Typography } from "@avipe/design-system";
import { useNavigate } from "react-router-dom";
import { usePlaylists } from "../../core/hooks/use-songs";
import { Card } from "../../design-system/Card";

const variants = {
  open: {
    transition: { staggerChildren: 0.08 },
  },
  closed: {
    transition: { staggerChildren: 0, staggerDirection: -1 },
  },
};

const itemVariants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      x: { stiffness: 1000, velocity: -1000 },
    },
  },
  closed: {
    y: 40,
    opacity: 0,
    transition: {
      x: { stiffness: 1000 },
    },
  },
};

function Playlists() {
  const playlists = usePlaylists();

  return (
    <React.Fragment>
      <Typography.H2>Playlists</Typography.H2>
      <PlaylistsCards
        isLoading={playlists.isLoading}
        playlists={playlists.data}
      />
    </React.Fragment>
  );
}

type PlaylistsCardsProps = {
  isLoading?: boolean;
  playlists?: any[];
};

function PlaylistsCards(props: PlaylistsCardsProps) {
  const navigate = useNavigate();

  if (props.isLoading) {
    return <Fallback />;
  }

  if (!props.playlists) {
    return <div>No Songs...</div>;
  }

  return (
    <CardGrid variants={variants} initial="closed" animate="open">
      {props.playlists.map((playlist: any) => {
        function openPlaylist() {
          navigate(`playlist/${playlist.id}`);
        }

        return (
          <Card key={playlist.id} variants={itemVariants}>
            <Card.Content>
              <Typography.H2>{playlist.name}</Typography.H2>
              <Typography.P>{playlist.description}</Typography.P>
            </Card.Content>
            <Card.PlayButton onClick={openPlaylist} />
          </Card>
        );
      })}
    </CardGrid>
  );
}

function Fallback() {
  return (
    <CardGrid>
      <Card.Fallback />
      <Card.Fallback />
      <Card.Fallback />
      <Card.Fallback />
    </CardGrid>
  );
}

const CardGrid = styled(motion.div)(
  ({ theme }) => css`
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 20px;

    @media (min-width: ${theme.tokens.breakpoints.md}) {
      grid-template-columns: repeat(4, 1fr);
    }
  `
);

export { Playlists };
