import React from "react";
import nock from "nock";
import TestRenderer from "react-test-renderer";
import ImageGallery from "./App";
import { fetchImages } from "./App";

describe("ImageGallery", () => {
  describe("Fetch images", () => {
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

    it("should give proper title of the image", async () => {
      nock("http://localhost")
        .get("/photos")
        .query({ page: 1 })
        .reply(200, {
          result: { data },
        })
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
