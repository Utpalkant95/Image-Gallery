import React, { useState, useEffect } from "react";
import { AiFillLike, AiFillDislike } from "react-icons/ai";
import data from "../data.json";

const ImageGallery = () => {
  //for search
  const [filter, setFilter] = useState("");
  const handleFilterChange = (event) => {
    setFilter(event.target.value.toLowerCase());
  };

  const filteredCelestialObjects = filter
    ? data.filter(
        (item) =>
          item.name.toLowerCase().includes(filter) ||
          item.category.toLowerCase().includes(filter)
      )
    : data;

  return (
    <div>
      <header className="bg-gray-800 py-5  flex items-center justify-between sticky top-0 z-50 ">
        <div className="max-w-[50px] max-h-[50px] overflow-hidden rounded-full ml-10  ">
          <img src="https://celestialbody.com/wp-content/uploads/2017/09/logowhite.jpg" />
        </div>
        
        <div className="w-full text-center">
          <div>
            <input
              type="text"
              className=" sm:w-1/2 md:w-1/2 px-7 rounded-sm py-3  "
              placeholder="search images........"
              onChange={handleFilterChange}
            />
          </div>
        </div>
      </header>
      {/* image layout */}
      <div className="container mx-auto px-5">
        <h1 className="text-4xl font-bold mb-8 text-center">Cosmic Gallery</h1>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
          {filteredCelestialObjects.map((item, index) => {
            return (
              <div
                key={index}
                className="relative  shadow-lg showDescription "
                title={item.name}
              >
                <div className="relative">
                  <img src={item.image} alt={item.name} className="w-full" />
                  <div className="absolute top-0 left-0 w-full h-full bg-slate-400 opacity-0 transition-opacity duration-300 hover:opacity-30"></div>
                </div>
                <div className="absolute  text-red-500 text-2xl top-2 right-2 likeButton">
                  <LikeButton id={item.id} />
                </div>
                <div className="px-3 py-1">
                  <p className="image-description">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ImageGallery;

const LikeButton = ({ itemId }) => {
  const [liked, setLiked] = useState(() => {
    const storedLiked = localStorage.getItem(`liked_${itemId}`);
    return storedLiked === "true";
  });

  useEffect(() => {
    localStorage.setItem(`liked_${itemId}`, liked.toString());
  }, [itemId, liked]);

  const toggleLiked = () => {
    setLiked((prevLiked) => !prevLiked);
  };

  return (
    <button onClick={toggleLiked}>
      {liked ? <AiFillLike /> : <AiFillDislike />}
    </button>
  );
};
