import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Disable browser's automatic scroll restoration
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  useEffect(() => {
    const scrollToTop = () => {
      // Target every possible scroll container
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;

      // Target #root in case it is the scroll container (height:100% scenario)
      const root = document.getElementById("root");
      if (root) root.scrollTop = 0;
    };

    // Run immediately
    scrollToTop();

    // Run again after layout is settled
    const id = setTimeout(scrollToTop, 60);
    return () => clearTimeout(id);
  }, [pathname]);

  return null;
}
