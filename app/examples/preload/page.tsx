"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { preload } from "react-dom";

// Example 1
// export default function PreloadExample() {
//   prefetchDNS("https://api.example.com");
//   preconnect("https://api.example.com");
//   preload("https://fonts.googleapis.com/css2?family=Roboto", { as: "style" });
//   preinit("https://www.googletagmanager.com/gtag/js", { as: "script" });

//   return (
//     <div className="p-4 bg-white rounded-lg shadow">
//       <h2 className="text-2xl font-bold mb-4">Resource Preloading Example</h2>
//       <p>
//         Check the network tab in your browser's developer tools to see the
//         preloaded resources.
//       </p>
//     </div>
//   );
// }

const ImageComponent = ({ src }: { src: string }) => {
  return (
    <img
      src={src}
      alt="Large random image"
      className="w-full h-auto rounded-md"
    />
  );
};

export default function Component() {
  const [showImage, setShowImage] = useState(false);
  const imageUrl = "https://picsum.photos/1000/1000"; // Large random image
  preload(imageUrl, { as: "image" });

  return (
    <div className="p-4 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h1 className="text-2xl font-bold">React Preload API Demo</h1>
      <p>
        {
          "Open your browser's network tab before clicking the button. You should see the image already loaded before it's displayed."
        }
      </p>
      <Button onClick={() => setShowImage(true)}>Show Image</Button>
      {showImage && <ImageComponent src={imageUrl} />}
    </div>
  );
}
