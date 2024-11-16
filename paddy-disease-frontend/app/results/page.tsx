"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FiLoader } from "react-icons/fi";

// Function to fetch link preview data
const fetchLinkPreview = async (url: string) => {
  try {
    console.log(url);
    const res = await fetch(`/api/preview?url=${encodeURIComponent(url)}`);
    const data = await res.json();

    // Check if the data is valid, and return the preview or null if unavailable
    if (data && data.title) {
      return data;
    } else {
      return null; // Return null for invalid data
    }
  } catch (error) {
    return null; // Return null if there's an error
  }
};

export default function Results() {
  const [prediction, setPrediction] = useState<string>(""); // Prediction data state
  const [linkPreviews, setLinkPreviews] = useState<any[]>([]); // State to store link previews
  const [loading, setLoading] = useState(true); // Loading state for fetching previews
  const [links, setLinks] = useState<string[]>([]); // State to store links fetched from localStorage
  const router = useRouter();

  useEffect(() => {
    // Fetch prediction data from localStorage
    const predictionData = JSON.parse(
      localStorage.getItem("predictionData") || "No prediction available"
    );

    if (predictionData) {
      // Capitalize first letter of each word
      const capitalizedPrediction: string = predictionData
        .split(" ")
        .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

      setPrediction(capitalizedPrediction); // Set prediction with capitalized value
    }

    // Fetch links from localStorage, default to empty array if not found
    const savedLinks = JSON.parse(localStorage.getItem("links") || "[]");
    setLinks(savedLinks);
  }, []); // Dependency on links to fetch previews whenever links change

  useEffect(() => {
    const fetchPreviews = async () => {
      // Immediately update link previews as they are fetched
      for (let i = 0; i < links.length; i++) {
        const preview = await fetchLinkPreview(links[i]);

        // If preview is not null, add it to the linkPreviews state
        if (preview !== null) {
          setLinkPreviews((prev) => [...prev, preview]);
        }
      }
      setLoading(false); // Set loading to false once all previews are fetched
    };

    if (links.length > 0) {
      fetchPreviews(); // Only fetch previews if there are links
    } else {
      setLoading(false); // Set loading to false if no links to fetch
    }
  }, [links]); // Dependency on links to fetch previews whenever links change

  const handleBackRequest = () => {
    // Redirect to the home page
    router.push("/app");
  };

  return (
    <main className="h-screen">
      {/* Loader until link previews are fetched */}
      {loading && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <FiLoader className="animate-spin text-white text-6xl" />
        </div>
      )}
      <div
        className="relative bg-cover bg-center h-screen"
        style={{ backgroundImage: "url('/images/home/main-app2.webp')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40 backdrop-blur-md"></div>

        <div className="absolute inset-0 flex items-center justify-center shadow-2xl">
          <div className="w-[600px] min-h-[500px] bg-background text-center relative text-foreground flex items-center justify-start flex-col gap-4">
            <h2 className="text-2xl font-semibold mb-4 border-b-[2px] pt-6 pb-6 border-foreground w-full bg-foreground text-background">
              {prediction || "No prediction Available"}
            </h2>
            <div className="flex flex-col gap-4 w-full"></div>

            {/* Display clickable links with previews */}
            <div className="flex flex-col gap-8 px-4 overflow-y-auto h-[300px]">
              {!loading && linkPreviews.length > 0 ? (
                linkPreviews.map((preview, index) => (
                  <a
                    key={index}
                    href={links[index]} // Using the correct preview URL
                    className="flex gap-4 items-center text-foreground hover:underline hover:cursor-pointer border-[2px] opacity-0 animate-fadeIn"
                    style={{ animationDelay: `${index * 0.1}s` }} // Delay animation for each item
                  >
                    <img
                      src={preview.image || "/images/default_link.jpg"} // Use default image if no preview image
                      alt={preview.title}
                      className="w-16 h-16 rounded-md"
                    />
                    <div className="flex flex-col justify-center items-center w-full">
                      <span className="font-semibold">{preview.title}</span>
                      <span className="text-sm text-gray-600">
                        {preview.description || "No description available"}
                      </span>
                    </div>
                  </a>
                ))
              ) : (
                <div className="text-center text-lg text-gray-500">
                  No previews available
                </div>
              )}
            </div>

            <div className="flex flex-col gap-4 absolute bottom-6">
              <button
                className="bg-foreground text-background hover:opacity-90 px-6 py-1 rounded-3xl"
                onClick={handleBackRequest}
              >
                Go back
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
