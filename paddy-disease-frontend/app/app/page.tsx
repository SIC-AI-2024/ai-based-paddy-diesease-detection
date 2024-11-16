"use client";
import { useEffect, useState } from "react";
import { CiImageOn } from "react-icons/ci";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FiLoader } from "react-icons/fi";

export default function Home() {
  const [image, setImage] = useState<File | null>(null);
  const [prediction, setPrediction] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false); // Loading state for spinner
  const router = useRouter(); // Router to handle redirection

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleDeleteImage = () => {
    setImage(null);
    setPrediction(null); // Reset prediction when image is deleted
  };

  const handleSubmit = async () => {
    if (!image) return; // If no image, do nothing

    const formData = new FormData();
    formData.append("image", image);

    setLoading(true); // Start the spinner

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/predict`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Assuming the response contains the prediction
      setPrediction(response.data.prediction);
      setLoading(false); // Stop the spinner

      // Save response data to localStorage
      localStorage.setItem(
        "predictionData",
        JSON.stringify(response.data.prediction)
      );
      localStorage.setItem("links", JSON.stringify(response.data.links));

      // Redirect to another page (e.g., /results) after prediction is done
      router.push(`/results?prediction=${response.data.prediction}`);
    } catch (error) {
      console.error("Error uploading image:", error);
      setLoading(false); // Stop the spinner in case of error
    }
  };

  useEffect(() => {
    console.log(image);
  }, [image]);

  return (
    <main className="h-screen">
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
          <div className="w-[400px] min-h-[450px] bg-background text-center relative text-foreground flex items-center justify-start flex-col gap-4">
            <h2 className="text-2xl font-semibold mb-4 border-b-[2px] pt-6 pb-6 border-foreground w-full bg-foreground text-background">
              Upload Your Image
            </h2>
            <div className="flex flex-col gap-4 ">
              {image ? (
                <div className="relative w-full h-40">
                  <img
                    src={URL.createObjectURL(image)}
                    alt="Uploaded preview"
                    className="w-full h-full object-cover rounded-xl "
                  />
                </div>
              ) : (
                <div className="relative w-full h-40">
                  <label
                    htmlFor="fileInput"
                    className="hover:cursor-pointer hover:opacity-80 w-full h-full"
                  >
                    <CiImageOn className="text-foreground text-2xl w-full h-full" />
                  </label>
                  <input
                    id="fileInput"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </div>
              )}
            </div>
            <div className="flex flex-col gap-4 absolute bottom-12">
              <button
                className="bg-foreground text-background hover:opacity-90 px-6 py-1 rounded-3xl"
                onClick={handleSubmit} // Trigger submission on click
                disabled={loading} // Disable button when loading
              >
                Go
              </button>

              <button
                className="bg-foreground text-background hover:opacity-90 px-6 py-1 rounded-3xl"
                onClick={handleDeleteImage}
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
