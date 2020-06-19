import React from "react";
import nock from "nock";
import TestRenderer from "react-test-renderer";
import ImageGallery from "./App";
import { fetchImages } from "./App";

const data = [
  {
    id: "01",
    title: "Avengers Infinity War",
  },
  {
    id: "02",
    title: "Avengers Endgame",
  },
];
const baseURL = "https://jsonplaceholder.typicode.com";
const path = "/photos";
const query = {
  page: 1,
};

describe("ImageGallery", () => {
  describe("Fetch images", () => {
    beforeEach(() => {
      // nock.disableNetConnect();
      nock(baseURL).log(console.log).get(path).query(query).reply(200, data);
    });

    afterEach(() => nock.cleanAll());

    it("should give proper title of the image", async () => {
      const results = await fetchImages(1);
      expect(results.data[0].title).toEqual(
        "accusamus beatae ad facilis cum similique qui sunt"
      );
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
