import axios from 'axios'
import React, { useEffect, useState } from 'react'

const ImageUrl = (imageBlob) => {
  const imageUrl = URL.createObjectURL(imageBlob);

  return (
    <img src={imageUrl} alt="" />
  );
}

const UrlCheck = () => {
  const [Data, setData] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/ProductDispalyView/")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div>
      <h1>UrlCheck</h1>
      {Data.map((item) => (
        <ImageUrl key={item.id} imageBlob={item.P_Images} />
      ))}
    </div>
  );
}

export default UrlCheck;
