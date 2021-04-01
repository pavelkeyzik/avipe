import { useState } from "react";

function useModal() {
  const [visible, setVisible] = useState(false);

  function open() {
    setVisible(true);
  }

  function close() {
    setVisible(false);
  }

  return {
    visible,
    open,
    close,
  };
}

export { useModal };
