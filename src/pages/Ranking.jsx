import React, { useEffect, useState } from "react";
import "styles/ranking.css";
import Navbar from "components/Navbar";
import Footer from "components/Footer";
import { Get } from "helpers/HTTPMethods";

const Ranking = () => {
  const [ranking, setRanking] = useState([]);

  useEffect(() => {
    Get("ranking/")
      .then((result) => {
        setRanking(result);
      })
      .catch((err) => {});
  }, []);
  return (
    <div>
      <Navbar />
      Ranking page
      <Footer />
    </div>
  );
};

export default Ranking;
