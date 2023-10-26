// Fetch recommendations from an API based on the given URL and query parameters.
export const fetchRecommendations = async (apiUrl, queryParams) => {
  try {
    const queryString = new URLSearchParams(queryParams).toString();
    const response = await fetch(`${apiUrl}?${queryString}`);
    const data = await response.json();
    return data.list;
  } catch (error) {
    throw new Error(error);
  }
};

// Create an HTML element with the specified tag, class name, and text content.
export const createElement = (tag, className, text) => {
  const element = document.createElement(tag);
  element.className = className;
  element.textContent = text;
  return element;
};

// Create a header container element with the widget title.
export const createHeaderContainer = (title) => {
  const headerContainer = createElement("div", "header-container");
  const widgetTitle = createElement("div", "widget-title", title);
  headerContainer.appendChild(widgetTitle);
  return headerContainer;
};

// Create a basic recommendation card element based on the given recommendation data.
export const createBasicCardElement = (recommendation) => {
  const recommendationCard = createElement("a", "recommendation-card");
  recommendationCard.href = recommendation.url;
  recommendationCard.title = recommendation.name;
  recommendationCard.target =
    recommendation.origin === "sponsored" ? "_blank" : "_self";
  return recommendationCard;
};

// Handle image loading error for a recommendation and potentially hide the card.
export const handleImageError = (
  recommendationImage,
  recommendationCard,
  isVisibleIfNoImg
) => {
  if (!isVisibleIfNoImg) {
    recommendationCard.remove();
    return;
  }
  recommendationImage.src = "./assets/image-not-found.png";
};

// Create an image element for a recommendation with error handling.
export const createImageElement = (
  recommendation,
  recommendationCard,
  isVisibleIfNoImg
) => {
  const recommendationImage = createElement("img", "recommendation-image");
  recommendationImage.onerror = () => {
    handleImageError(recommendationImage, recommendationCard, isVisibleIfNoImg);
  };
  const imgUrl = recommendation.thumbnail[0]?.url;
  recommendationImage.src = imgUrl;
  recommendationImage.alt = recommendation.name;
  return recommendationImage;
};

// Create a description element for a recommendation.
export const createDescriptionElement = (recommendation) => {
  const recommendationDescription = createElement(
    "div",
    "recommendation-description",
    recommendation.name
  );
  return recommendationDescription;
};

// Create a branding element for a sponsored recommendation.
export const createBrandingElement = (recommendation) => {
  const recommendationBranding = createElement(
    "div",
    "recommendation-branding",
    recommendation.branding
  );
  return recommendationBranding;
};

// Create a complete recommendation card with image, description, and branding (if sponsored).
export const createRecommendationCard = (recommendation, isVisibleIfNoImg) => {
  const recommendationCard = createBasicCardElement(recommendation);
  const recommendationImage = createImageElement(
    recommendation,
    recommendationCard,
    isVisibleIfNoImg
  );
  const recommendationDescription = createDescriptionElement(recommendation);

  recommendationCard.appendChild(recommendationImage);
  recommendationCard.appendChild(recommendationDescription);
  if (recommendation.origin === "sponsored") {
    const recommendationBranding = createBrandingElement(recommendation);
    recommendationCard.appendChild(recommendationBranding);
  }
  return recommendationCard;
};

// Create a button element for showing different topics, and attach a click event listener to trigger an update.
export const createShowDiffTopicsButtonElement = (
  buttonTitle,
  updateRecommendations,
  headerContainer,
  widgetContainer
) => {
  const showDifferentTopicsButton = createElement(
    "button",
    "show-different-topics-button",
    buttonTitle
  );
  showDifferentTopicsButton.addEventListener("click", updateRecommendations);
  headerContainer.appendChild(showDifferentTopicsButton);
  widgetContainer.appendChild(headerContainer);
};
