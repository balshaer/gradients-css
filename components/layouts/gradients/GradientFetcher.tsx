import React, { useEffect } from "react";

interface Gradient {
  id: number;
  name: string;
  colors: string[];
}

interface Props {
  setGradients: React.Dispatch<React.SetStateAction<Gradient[]>>;
}

const GradientFetcher: React.FC<Props> = ({ setGradients }) => {
  useEffect(() => {
    const fetchGradients = async () => {
      try {
        const res = await fetch(
          "https://raw.githubusercontent.com/ghosh/uiGradients/master/gradients.json"
        );
        const result: Gradient[] = await res.json();
        setGradients(result);
      } catch (err) {
        setGradients([]);
      }
    };

    fetchGradients();
  }, [setGradients]);

  return null;
};

export default GradientFetcher;
