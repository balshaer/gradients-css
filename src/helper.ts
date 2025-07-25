import { animateScroll as scroll } from "react-scroll";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

interface helperTypes {
  title: string;
}

export const scrollToTop = () => {
  scroll.scrollToTop({ duration: 500, smooth: true });
};

export const PageTitle: React.FC<helperTypes> = ({ title }) => {
  const location = useLocation();

  useEffect(() => {
    document.title = title;
  }, [location, title]);

  return null;
};
