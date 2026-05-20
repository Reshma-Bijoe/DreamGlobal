import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const useSectionReplay = (hash: string) => {
  const location = useLocation();
  const [replayKey, setReplayKey] = useState(0);

  useEffect(() => {
    if (location.hash === hash) {
      setReplayKey((current) => current + 1);
    }
  }, [hash, location.hash]);

  useEffect(() => {
    const replaySection = (event: Event) => {
      const sectionEvent = event as CustomEvent<{ hash?: string }>;

      if (sectionEvent.detail?.hash === hash) {
        setReplayKey((current) => current + 1);
      }
    };

    window.addEventListener("dreamglobal:section-replay", replaySection);

    return () => {
      window.removeEventListener("dreamglobal:section-replay", replaySection);
    };
  }, [hash]);

  return replayKey;
};

export default useSectionReplay;
