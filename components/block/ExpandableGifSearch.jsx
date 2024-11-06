import React, { useContext, useEffect, useRef, useState } from "react";
import { GiphyFetch } from "@giphy/js-fetch-api";
import {
  Grid, // our UI Component to display the results
  SearchBar, // the search bar the user will type into
  SearchContext, // the context that wraps and connects our components
  SearchContextManager, // the context manager, includes the Context.Provider
  SuggestionBar, // an optional UI component that displays trending searches and channel / username results
} from "@giphy/react-components";

const SearchExperience = ({ setSelectedGif, setShowGifPicker }) => {
  return (
    <SearchContextManager apiKey={"4PtUzZnbzuxWTLFRFZ64ClwzZitO6U1w"}>
      <ExpandableGifSearch
        setSelectedGif={setSelectedGif}
        setShowGifPicker={setShowGifPicker}
      />
    </SearchContextManager>
  );
};

const ExpandableGifSearch = ({ setSelectedGif, setShowGifPicker }) => {
  const { fetchGifs, searchKey } = useContext(SearchContext);
  const containerRef = useRef(null);
  const [width, setWidth] = useState(0);

  const handleGifSelect = (gif) => {
    console.log("Selected GIF URL:", gif.images.original.url);

    setSelectedGif(gif.images.original.url); // Get the original URL of the selected GIF
    setShowGifPicker(false); // Close the GIF picker
  };

  useEffect(() => {
    const width = containerRef.current.getBoundingClientRect().width;
    setWidth(width);
  }, [containerRef]);

  return (
    <div className="max-h-[250px]" ref={containerRef}>
      <SearchBar />
      <SuggestionBar />
      <Grid
        fetchGifs={fetchGifs} // Fetch trending GIFs
        onGifClick={(gif) => {
          handleGifSelect(gif); // Use the refined function to handle GIF selection
        }} // Handle GIF selection
        noResultsMessage="No GIFs found"
        key={searchKey}
        searchPlaceholder="Search GIFs..." // Optional: Search placeholder
        columns={4}
        className="w-full h-[200px] overflow-y-auto "
        width={width}
        noLink={true}
        hideAttribution={true}
      />
    </div>
  );
};

export default SearchExperience;
