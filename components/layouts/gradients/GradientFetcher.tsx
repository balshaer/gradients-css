import { useEffect, useState } from "react";

const GradientFetcher = ({ setGradients }) => {
  useEffect(() => {
    const fetchGradients = async () => {
      try {
        const res = await fetch(
          "https://raw.githubusercontent.com/ghosh/uiGradients/master/gradients.json"
        );
        const result = await res.json();
        setGradients(result);
        console.log(result);
      } catch (err) {
        console.log(err);
        setGradients([]);
      }
    };

    fetchGradients();
  }, [setGradients]);

  return null;
};

export default GradientFetcher;
