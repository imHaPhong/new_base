import axios from "axios";
import { useEffect, useState } from "react";
import { FaQuoteLeft, FaTumblrSquare, FaTwitterSquare } from "react-icons/fa";
export default function Quotes() {
  const [quote, setQuote] = useState({
    author: "",
    content: "",
    isLoading: false,
  });

  const [color, setColor] = useState(null);

  async function getData() {
    setQuote((p) => ({
      ...p,
      isLoading: true,
    }));
    const res = await axios.get("https://api.quotable.io/random");
    const { author, content } = res.data;
    setQuote({
      author,
      content,
      isLoading: false,
    });
    setColor(getColor());
  }

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function getQuote() {
    getData();
  }

  function getColor() {
    const listColor = [
      "#16a085",
      "#27ae60",
      "#2c3e50",
      "#f39c12",
      "#e74c3c",
      "#9b59b6",
      "#FB6964",
      "#342224",
      "#472E32",
      "#BDBB99",
      "#77B1A9",
      "#73A857",
    ];

    const color = Math.floor(Math.random() * 12);
    return listColor[color];
  }

  return (
    <div
      className="flex w-screen h-screen items-center justify-center transition-all duration-500 "
      style={{ backgroundColor: `${color}`, color: `${color}` }}
    >
      <div className="rounded mx-5 bg-white p-4 clear-both  md:w-3/4 lg:w-2/5 xl:w-2/6">
        <div className={`transition-opacity duration-200 ${!quote.isLoading ? "" : "opacity-0"}`}>
          <FaQuoteLeft className="text-2xl float-left mr-5" />
          <p className="text-2xl font-medium text-justify ">{quote.content}</p>
          <p className="text-right mt-5">- {quote.author}</p>
        </div>
        <div className="flex justify-between mt-10 ">
          <div className="flex items-center">
            <FaTwitterSquare className="text-4xl" />
            <FaTumblrSquare className="text-4xl" />
          </div>
          <button
            className="p-2 text-white rounded"
            onClick={getQuote}
            style={{ backgroundColor: `${color}` }}
          >
            New quote
          </button>
        </div>
      </div>
    </div>
  );
}
