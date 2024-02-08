import React, { useState } from "react";

const RatingForm: React.FC<{ onRatingSubmit: (rating: number) => void }> = ({ onRatingSubmit }) => {
  const [rating, setRating] = useState(0);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex">
        {[...Array(5)].map((_, index) => (
          <button
            key={index}
            className={`text-2xl ${rating > index ? "text-yellow-500" : "text-gray-300"}`}
            onClick={() => setRating(index + 1)}
          >
            ★
          </button>
        ))}
      </div>
      <button
        className="mt-3 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md"
        onClick={() => onRatingSubmit(rating)}
      >
        Submit Rating
      </button>
    </div>
  );
};

export default RatingForm;