import "react-photoswipe/lib/photoswipe.css";
import "./index.css";

import React, { useEffect, useState } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroller";
import { PhotoSwipeGallery } from "react-photoswipe";

export const APIURL = "https://jsonplaceholder.typicode.com/photos";
export const fetchImages = (page = 1) => axios.get(`${APIURL}?albumId=${page}`);

let page = 0;

/**
 * Image gallery class
 */
function ImageGallery() {
  const [images, setImages] = useState([]);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isImageViewerOpen, setIsImageViewerOpen] = useState(false);
  const [error, setError] = useState(false);

  /**
   * Get images from API
   */
  const getImages = async () => {
    page++;
    setError(false);
    try {
      const result = await fetchImages(page);
      setImages(images.concat(parseImages(result.data)));
    } catch (error) {
      setError(true);
    }
    setIsInitialized(true);
  };

  /**
   * Parse images to be able to be displayed by PhotoSwipeGallery
   *
   * @return list of parsed images with proper model
   */
  const parseImages = (data) => {
    return data.reduce((acc, image) => {
      acc.push({
        ...image,
        src: image.thumbnailUrl,
        thumbnail: image.thumbnailUrl,
        w: image.width ? image.width : 1200,
        h: image.height ? image.height : 900,
        title: image.id,
      });
      return acc;
    }, []);
  };

  /**
   * Close image viewer
   */
  const closeImageViewer = () => {
    setIsImageViewerOpen(false);
  };

  /**
   * Thumbnails content
   */
  const getThumbnailContent = (image) => (
    <img alt={image.title} src={image.thumbnail} width={180} height={150} />
  );

  useEffect(() => {
    if (!isInitialized) {
      getImages();
    }
  });

  return (
    <div className="homepage">
      <InfiniteScroll
        pageStart={page}
        loadMore={getImages}
        loader={<h4 style={{ textAlign: "center" }}>Loading...</h4>}
        hasMore={!!images.length}
        threshold={100}
      >
        {isInitialized ? (
          <PhotoSwipeGallery
            items={images}
            thumbnailContent={getThumbnailContent}
            isOpen={isImageViewerOpen}
            onClose={closeImageViewer}
          />
        ) : (
          <h4 style={{ textAlign: "center" }}>Loading...</h4>
        )}
      </InfiniteScroll>

      {error && (
        <h4 style={{ color: `red`, textAlign: "center" }}>
          Oops, error occured!
        </h4>
      )}
    </div>
  );
}
export default ImageGallery;
