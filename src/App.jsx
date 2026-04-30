import { useState } from "react";
import "./App.css";
import { data } from "./data";

function App () {
  const [activities, setActivities] = useState(data);
  const [index, setIndex] = useState(0);  
  const [imgIndex, setImgIndex] = useState(0);
  
 
  const removeActivity = (id) => {
    const newList = activities.filter(item => item.id !== id);
    setActivities(newList);

    if (index >= newList.length) {
      setIndex(0);
    }

  }

  const deleteAll = () => {
    setActivities([]);
  };

  const nextItem = () => {
    setIndex((prev) => {
      let newIndex = prev + 1;
      if (newIndex > activities.length - 1) newIndex = 0;
      return newIndex;
    });
    setImgIndex(0);
  };

  const prevItem = () => {
    setIndex((prev) => {
      let newIndex = prev - 1;
      if (newIndex < 0) newIndex = activities.length - 1;
      return newIndex;
    });
    setImgIndex(0);
  };

  if (activities.length === 0) {
    return (
      <div className="empty">
        <h1>No activities left</h1>
        <button onClick={() => setActivities(data)}>Reset</button>
      </div>
    );
  }

  const safeIndex = index >= activities.length ? 0 : index;
  const currentActivity = activities[index];
  const { id, name, description, age, price, images } = activities[safeIndex];
 
  const currentImages = images || [];
  const safeImgIndex = imgIndex % currentImages.length;
 
  
  

  const nextImage = () => {
  setImgIndex((prev) => {
    if (currentImages.length === 0) return 0;
    return (prev + 1) % currentImages.length;
    });
  };

  const prevImage = () => {
  setImgIndex((prev) => {
    if (currentImages.length === 0) return 0;
    return prev === 0 ? currentImages.length - 1 : prev - 1;
    });
  };
 
return (
    <div>
      <div className="container">
        <h1 className="title">Kids Activities in Ottawa({activities.length})</h1>
      </div>

      <div className="card">
        <div className="image-wrapper">
          <img src={currentImages[safeImgIndex]} alt={name} />
       
          <button className="img-btn left" onClick={prevImage}>‹</button>
          <button className="img-btn right" onClick={nextImage}>›</button>
        </div>

        <h2>{name}</h2>
        <p>{description}</p>

        <p><strong>Age:</strong> {age}</p>
        <p><strong>Price:</strong> {price}</p>

        <button onClick={() => removeActivity(id)}>Remove</button>
      </div>

      <div className="btn">
        <button onClick={prevItem}>Previous</button>
        <button onClick={nextItem}>Next</button>
      </div>

      <div className="container">
        <button onClick={deleteAll}>Delete All</button>
      </div>
    </div>
  );
 
}

export default App;

