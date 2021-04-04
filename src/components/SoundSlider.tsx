import styled from "@emotion/styled";
import { useEffect, useRef, useState } from "react";

const config = {
  trackSize: "6px",
  thumbSize: "24px",
};

type Progress = {
  progress: number;
};

function getLocalProgress(localProgress: number, max: number) {
  const step = Math.ceil((localProgress * max) / 100);
  const inOneStep = 100 / max;

  if (inOneStep * step - inOneStep / 2 < localProgress) {
    return (step * 100) / max;
  }

  return ((step - 1) * 100) / max;
}

function getProgressFromValue(value: number, max: number) {
  return Math.ceil((value * 100) / max);
}

type SoundSliderProps = {
  value: number;
  max: number;
  onRelease?: (result: number) => void;
};

function SoundSlider(props: SoundSliderProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(false);
  const valueFromProps = getProgressFromValue(props.value, props.max);
  const [localProgress, setLocalProgress] = useState(valueFromProps);

  useEffect(() => {
    if (!active) {
      setLocalProgress(valueFromProps);
    }
  }, [active, valueFromProps]);

  function handleMouseDown() {
    setActive(true);

    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mousemove", handleMouseMove);
  }

  function handleMouseUp(event: MouseEvent) {
    handleRelease(event);

    document.removeEventListener("mouseup", handleMouseUp);
    document.removeEventListener("mousemove", handleMouseMove);
  }

  function handleRelease(event: MouseEvent) {
    handleMouseMove(event);
    setActive(false);

    setLocalProgress((prev) => {
      const result = getLocalProgress(prev, props.max);

      if (props.onRelease) {
        props.onRelease(Math.floor((result * props.max) / 100));
      }

      return result;
    });
  }

  function handleMouseMove(event: MouseEvent) {
    if (ref.current) {
      const trackRects = ref.current.getClientRects().item(0);

      if (!trackRects) {
        return;
      }

      const position = event.clientX - trackRects.x;
      const max = trackRects.width;
      const min = 0;

      if (position >= min && position <= max) {
        const positionProgress = (position * 100) / max;
        updateProgressPosition(positionProgress);
      }

      if (position < 0) {
        updateProgressPosition(0);
      }

      if (position > max) {
        updateProgressPosition(100);
      }
    }
  }

  function updateProgressPosition(progressNumber: number) {
    setLocalProgress(progressNumber);
  }

  return (
    <RootWrapper>
      <Root onMouseDown={handleMouseDown}>
        <Track ref={ref}>
          <TrackProgress progress={localProgress} />
          <Thumb progress={localProgress} />
        </Track>
      </Root>
    </RootWrapper>
  );
}

const RootWrapper = styled.div`
  width: 100%;
  padding: 0 calc(${config.thumbSize} / 2);
`;

const Root = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  height: ${config.thumbSize};
`;

const Track = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: ${config.trackSize};
  border-radius: ${config.trackSize};
  background: rgba(255, 255, 255, 0.1);
`;

const TrackProgress = styled.div<Progress>`
  width: ${(props) => `${props.progress}%`};
  height: ${config.trackSize};
  border-radius: ${config.trackSize};
  background: #43d17c;
`;

const Thumb = styled.div<Progress>`
  position: absolute;
  top: 0;
  left: ${(props) => `calc(${props.progress}% - (${config.thumbSize} / 2))`};
  display: flex;
  align-items: center;
  height: ${config.thumbSize};
  width: ${config.thumbSize};
  border-radius: ${config.thumbSize};
  background: white;
  cursor: pointer;

  :hover {
    transform: scale(1.1);
  }
`;

export { SoundSlider };
