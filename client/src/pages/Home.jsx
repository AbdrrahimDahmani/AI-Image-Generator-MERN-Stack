import React, { useState, useEffect } from "react";
import { Loader, Card, FormField } from "../components";
import { preview } from "../assets";
import { bg } from "../assets";
const RenderCards = ({ data, title }) => {
  if (data?.length > 0) {
    return data.map((post) => <Card key={post._id} {...post} />);
  }
  return (
    <h2 className="mt-5 font-bold text-[#6449ff] text-l uppercase">{title}</h2>
  );
};

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [allPosts, setAllPosts] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [searchedResult, setSearchedResult] = useState(null);
  const [searchTimeout, setSearchTimeout] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "https://image-generator-tmbw.onrender.com/api/v1/post",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const result = await response.json();
          console.log(result);
          setAllPosts(result.data.reverse());
        }
      } catch (error) {
        alert(error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = allPosts.filter(
          (item) =>
            item.name.toLowerCase().includes(searchText.toLowerCase()) ||
            item.prompt.toLowerCase().includes(searchText.toLowerCase())
        );
        setSearchedResult(searchResult);
      }, 500)
    );
  };

  return (
    <div>
      <img
        src={bg}
        alt="background"
        className="hidden lg:block m-0 w-full absolute left-0 top-[6rem] scale-[1] sm:bg-none"
      />
      <section className="max-w-7xl mx-auto relative">
        <div className="lg:flex lg:flex-col lg:items-center lgjustify-center mt-[100px]">
          <h1 className="font-bold text-[#45578C] text-[32px] ">
            The Community Showcase
          </h1>
          <p className="mt-2 text-[#666e75] text-[16px] lg:max-w-[550px] lg:text-center">
            Browse through the most popular imaginative and visually stunning AI
            images from the community
          </p>
        </div>
        <div className="mt-[5rem]">
          <FormField
            // labelName="Search Posts"
            type="text"
            name="search"
            placeholder="Search Posts"
            value={searchText}
            handleChange={handleSearchChange}
          />
        </div>
        <div className="mt-10">
          {loading ? (
            <div className="flex  justify-center items-center">
              <Loader />
            </div>
          ) : (
            <>
              {searchText && (
                <h2 className="font-medium text-[#666e75] text-l mb-3">
                  Showing results for{" "}
                  <span className="text-[#222328]">{searchText}</span>
                </h2>
              )}
            </>
          )}
          <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3">
            {searchText ? (
              <RenderCards
                data={searchedResult}
                title="No search results found"
              />
            ) : (
              <RenderCards data={allPosts} title="No posts found" />
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
