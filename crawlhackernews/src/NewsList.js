import React, { useState, useEffect } from "react";
import axios from "axios";

const NewsList = ({ setLoggedInUser }) => {
  const [newsItems, setNewsItems] = useState([]);
  const [readItems, setReadItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const storedNewsItems = localStorage.getItem("newsItems");
        const storedReadItems = localStorage.getItem("readItems");

        if (storedNewsItems && storedReadItems) {
          const localNewsItems = JSON.parse(storedNewsItems);
          const localReadItems = JSON.parse(storedReadItems);

          const response = await axios.get("http://localhost:5000/news", {
            onDownloadProgress: (progressEvent) => {
              const progress = Math.round(
                (progressEvent.loaded / progressEvent.total) * 100
              );
              setLoadingProgress(progress);
            },
          });

          const sortedNewsItems = response.data.sort((a, b) => {
            const dateA = new Date(a.timestamp);
            const dateB = new Date(b.timestamp);
            return dateB - dateA;
          });

          // Compare fetched news items with local storage
          console.log("Pahunh gya");
          const isUpdated =
            JSON.stringify(localNewsItems) !== JSON.stringify(sortedNewsItems);

          if (isUpdated) {
            console.log("equal nhi hai");
            setNewsItems(sortedNewsItems);
            localStorage.setItem("newsItems", JSON.stringify(sortedNewsItems));
            // Reset read items in local storage
            localStorage.setItem("readItems", JSON.stringify([]));
            const filteredReadItems = localReadItems.filter((item) =>
              sortedNewsItems.some((newsItem) => newsItem.title === item)
            );
            setReadItems(filteredReadItems);
            setLoading(false);
          } else {
            console.log("hqahaa");
            setNewsItems(localNewsItems);
            setReadItems(localReadItems);
            setLoading(false);
          }
        } else {
          const response = await axios.get("http://localhost:5000/news", {
            onDownloadProgress: (progressEvent) => {
              const progress = Math.round(
                (progressEvent.loaded / progressEvent.total) * 100
              );
              setLoadingProgress(progress);
            },
          });
          const sortedNewsItems = response.data.sort((a, b) => {
            const dateA = new Date(a.timestamp);
            const dateB = new Date(b.timestamp);
            return dateB - dateA;
          });
          setNewsItems(sortedNewsItems);
          setLoading(false);
          localStorage.setItem("newsItems", JSON.stringify(sortedNewsItems));
          localStorage.setItem("readItems", JSON.stringify([]));
        }
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchNews();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser"); // Clear logged-in user from local storage
    setLoggedInUser(null); // Update state to null
  };
  const markAsRead = (index) => {
    const updatedReadItems = [...readItems, newsItems[index].title];
    setReadItems(updatedReadItems);
    localStorage.setItem("readItems", JSON.stringify(updatedReadItems));
  };

  const deleteItem = (index) => {
    const updatedNewsItems = [...newsItems];
    updatedNewsItems.splice(index, 1);
    setNewsItems(updatedNewsItems);
    localStorage.setItem("newsItems", JSON.stringify(updatedNewsItems));
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Latest News</h1>
      <button onClick={handleLogout}>Logout</button>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
          <div className="ml-4">{loadingProgress}%</div>
        </div>
      ) : (
        <ul>
          {newsItems.map((item, index) => (
            <li
              key={index}
              className={`flex py-2 border-b border-gray-200 ${
                readItems.includes(item.title)
                  ? "bg-green-100"
                  : "hover:bg-gray-100"
              }`}
            >
              <span className="mr-4">{index + 1}.</span>
              <div className="flex-grow">
                <a href={item.url} className="text-blue-500 hover:underline">
                  {item.title}
                </a>
              </div>
              <div className="text-center">
                <span className="ml-2">Score: {item.score}</span>
                <span className="ml-2">Comments: {item.comments}</span>
              </div>
              <div>
                <button
                  onClick={() => markAsRead(index)}
                  className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                >
                  Mark as Read
                </button>
                <button
                  onClick={() => deleteItem(index)}
                  className="ml-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <h2 className="text-lg font-bold mt-8">Read Items</h2>
      <ul>
        {readItems.map((item, index) => (
          <li key={index} className="py-2">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NewsList;
