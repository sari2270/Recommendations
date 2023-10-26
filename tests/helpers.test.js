import sinon from "sinon";
import chai from "chai";
const expect = chai.expect;
import {
  fetchRecommendations,
  createHeaderContainer,
  createBasicCardElement,
  handleImageError,
  createImageElement,
  createDescriptionElement,
  createBrandingElement,
} from "../utils/helpers.js";

global.fetch = async (url) => {
  return Promise.resolve({
    json: () => Promise.resolve({ list: [] }),
  });
};

global.document = {
  createElement: (tag) => {
    const element = {
      className: "",
      textContent: "",
      appendChild: (child) => {
        element.textContent = child.textContent;
      },
    };
    return element;
  },
};

describe("fetchRecommendations", () => {
  it("should return recommendations", async () => {
    const recommendations = await fetchRecommendations("mocked-url", {});
    expect(recommendations).to.be.an("array");
  });
});

describe("createHeaderContainer", () => {
  it("should create a header container with a title", () => {
    const headerContainer = createHeaderContainer("Test Title");
    expect(headerContainer.textContent).to.equal("Test Title");
  });
});

describe("createBasicCardElement", () => {
  it("should create a basic recommendation card", () => {
    const recommendation = {
      url: "test-url",
      name: "Test Name",
      origin: "sponsored",
    };
    const recommendationCard = createBasicCardElement(recommendation);

    expect(recommendationCard.href).to.equal("test-url");
    expect(recommendationCard.title).to.equal("Test Name");
    expect(recommendationCard.target).to.equal("_blank");
  });
});

describe("handleImageError", () => {
  it("should hide the card when isVisibleIfNoImg is false", () => {
    const recommendationImage = { remove: sinon.spy() };
    const recommendationCard = { remove: sinon.spy() };

    handleImageError(recommendationImage, recommendationCard, false);

    expect(recommendationCard.remove.called).to.be.true;
  });
});

describe("createImageElement", () => {
  it("should create an image element", () => {
    const recommendation = {
      thumbnail: [{ url: "test-image-url" }],
      name: "Test Name",
    };
    const recommendationCard = document.createElement("a");
    const isVisibleIfNoImg = true;

    const recommendationImage = createImageElement(
      recommendation,
      recommendationCard,
      isVisibleIfNoImg
    );

    expect(recommendationImage.src).to.equal("test-image-url");
    expect(recommendationImage.alt).to.equal("Test Name");
  });
});

describe("createDescriptionElement", () => {
  it("should create a description element", () => {
    const recommendation = {
      name: "Test Name",
    };

    const recommendationDescription = createDescriptionElement(recommendation);

    expect(recommendationDescription.textContent).to.equal("Test Name");
  });
});

describe("createBrandingElement", () => {
  it("should create a branding element for a sponsored recommendation", () => {
    const recommendation = {
      branding: "Test Branding",
      origin: "sponsored",
    };

    const recommendationBranding = createBrandingElement(recommendation);

    expect(recommendationBranding.textContent).to.equal("Test Branding");
  });
});
