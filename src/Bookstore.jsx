import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
const Bookstore = () => {
  const API = "AIzaSyDZfHsLb3qWddxfgml7e3ni8Ov5xQNLcw8";
  const [books, setBooks] = useState([]);
  const [input, setInput] = useState("google");

  const getData = async () => {
    try {
      await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${input}&maxResults=20&key=${API}`
      )
        .then((res) => res.json())
        .then((res) => {
          console.log(res.items);
          setBooks(res.items);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="p-10 bg-v4">
      <div className="h-20 text-3xl font-bold font-sans my-5 bg-v1 text-v4 p-3 flex flex-col justify-center">
        Google-Books
      </div>
      <div className="h-20 flex flex-row justify-center items-center gap-10 text-md font-semibold">
        <input
          className="p-4 bg-v3 b rounded-lg"
          type="text"
          id="book"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={getData} className="hover:scale-125 text-2xl">
          <CiSearch />
        </button>
      </div>
      <div className="flex flex-col gap-10">
        {books.map((item) => (
          <div
            key={item.id}
            className="flex flex-row gap-10 w-full p-3  border-2 border-v3 my-5 items-center justify-between bg-v3"
          >
            <div className="w-[10%] flex flex-col justify-center items-start gap-5">
              <div>
                <img
                  src={item.volumeInfo.imageLinks?.thumbnail}
                  alt={item.volumeInfo?.title}
                />
              </div>
            </div>

            <div className="w-[50%] flex flex-col gap-2 ">
              <div className="font-bold text-3xl">{item.volumeInfo?.title}</div>
              <div className="flex flex-row gap-4 items-center">
                <div className="text-xl font-semibold">
                  - {item.volumeInfo?.authors}
                </div>
                <div>{item.volumeInfo?.publishedDate}</div>
              </div>
              <div className="flex flex-row gap-3 text-xl">
                <div className="bg-v2 p-2 rounded-2xl hover:bg-v1 w-20">
                  <a href={item.volumeInfo?.previewLink} target="_blanck">
                    Preview
                  </a>
                </div>
                <div
                  className={`bg-v2 p-2 rounded-2xl hover:bg-v1 w-20 text-center ${
                    item.saleInfo?.saleability === "FOR_SALE"
                      ? "block"
                      : "hidden"
                  }`}
                >
                  <a href={item.saleInfo?.buyLink} target="_blanck">
                    Buy
                  </a>
                </div>
              </div>
              <div
                className={`font-bold text-3xl text-red-900 ${
                  item.saleInfo?.saleability === "FOR_SALE" ? "hidden" : "block"
                }`}
              >
                NOT FOR SALE
              </div>
              <div className="flex flex-row gap-5 items-center font-bold">
                <div className="text-3xl">
                  {item.saleInfo?.listPrice?.amount}
                </div>
                <div className="text-2xl">
                  <strike>{item.saleInfo?.retailPrice?.amount}</strike>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Bookstore;
