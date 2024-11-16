import React from "react";

export type SectionComponentProps = {
  heading: string;
  message: string;
  imageSrc: string;
  isImageLeft: boolean;
};

export default function Section({
  heading,
  message,
  imageSrc,
  isImageLeft,
}: SectionComponentProps) {
  return (
    <div
      className={`flex flex-col border-[2px] border-t-foreground mt-4 ${
        isImageLeft ? "md:flex-row" : "md:flex-row-reverse"
      } items-center justify-center gap-8 py-12 w-[50%]`}
    >
      {/* Text Section */}
      <div className="flex-1 text-center md:text-left">
        <h3 className="text-2xl font-semibold text-primary mb-4">{heading}</h3>
        <p className="text-gray-700">{message}</p>
      </div>

      {/* Image Section */}
      <div className="flex-shrink-0">
        <div className="relative w-40 h-40 overflow-hidden rounded-full shadow-lg">
          <img
            src={imageSrc}
            alt={heading}
            className="object-cover w-full h-full"
          />
        </div>
      </div>
    </div>
  );
}
