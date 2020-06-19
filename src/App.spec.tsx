import React from "react";
import nock from "nock";
import TestRenderer from "react-test-renderer";
import ImageGallery, { ApiImage, parseImages } from "./App";
import { fetchImages } from "./App";
import { PhotoSwipeGalleryItem } from "react-photoswipe";

const baseURL = "https://jsonplaceholder.typicode.com";
const path = "/photos";
const query = {
  albumId: 1,
};
const data: ApiImage[] = [
  {
    albumId: 1,
    id: 1,
    thumbnailUrl: 'dummy thumbnail url 1',
    title: 'Dummy image title 1',
    url: 'dummy image url 1'
  },
  {
    albumId: 1,
    id: 2,
    thumbnailUrl: 'dummy thumbnail url 2',
    title: 'Dummy image title 2',
    url: 'dummy image url 2'
  }
];

describe("ImageGallery", () => {
  describe("Fetch images", () => {
    beforeEach(() => {
      nock.disableNetConnect();
    });

    afterEach(() => nock.cleanAll());

    it("should return correct number of images", async () => {
      nock(baseURL)
        .defaultReplyHeaders({ "access-control-allow-origin": "*" })
        .get(path)
        .query(query)
        .reply(200, data);
      const results = await fetchImages(1);
      expect(results.data.length).toEqual(2);
    });

    it("should render title of the image", async () => {
      nock(baseURL)
        .defaultReplyHeaders({ "access-control-allow-origin": "*" })
        .get(path)
        .query(query)
        .reply(200, data);
      const results = await fetchImages(1);
      expect(results.data[0].title).toEqual("Dummy image title 1");
    });

    it("should parsed api returned images properly for rendering", async () => {
      const parsedImages: PhotoSwipeGalleryItem[] = [{
        ...data[0],
        thumbnail: 'dummy thumbnail url 1',
        src: 'dummy thumbnail url 1',
        w: 1200,
        h: 900
      },
      { 
        ...data[1],
        thumbnail: 'dummy thumbnail url 2',
        src: 'dummy thumbnail url 2',
        w: 1200,
        h: 900
      }];
      expect(parseImages(data)).toEqual(parsedImages);
    });
  });

  describe("ImageGallery", () => {
    test("snapshot renders", () => {
      const component = TestRenderer.create(<ImageGallery />);
      let tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
