import { useParams } from "react-router-dom";

const { useState } = require("react");
const { useEffect } = require("react");

const AdDetail = () => {
  const [ad, setAd] = useState(null);
  const [loading, setLoading] = useState(true);
  const { avertissementId } = useParams()
  useEffect(() => {
    fetch(`http://localhost:3001/advert/${avertissementId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setAd(data);
        setLoading(false);
      });
  });
  return (
    loading ? <div>loading...</div> :
    <div>{ad.title}</div>
  )
};

export default AdDetail;
