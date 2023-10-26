import { defaultQueryParams, defaultConfig } from "./config/_core-config.js";
import strings from "./utils/strings.js";
import {
  fetchRecommendations,
  createElement,
  createHeaderContainer,
  createRecommendationCard,
  createShowDiffTopicsButtonElement,
} from "./utils/helpers.js";

export const renderRecommendations = (
  container,
  customConfig,
  customQueryParams
) => {
  const queryParams = { ...defaultQueryParams, ...customQueryParams };
  const config = { ...defaultConfig, ...customConfig };
  const { title, apiUrl, isGetNewRecBtnVisible, isHiddenIfNoImg } = config;

  // Find the widget container element in the DOM.
  const widgetContainer = document.getElementById(container);

  // Create header, cards, and error containers for recommendations.
  const headerContainer = createHeaderContainer(title);
  const cardsContainer = createElement("div", "cards-container", "");
  const errorContainer = createElement("div", "error-container", "");

  // Function to populate recommendations data and update the UI.
  const populateRecommendations = async () => {
    cardsContainer.innerHTML = "";
    errorContainer.innerHTML = "";
    try {
      const recommendations = await fetchRecommendations(apiUrl, queryParams);
      if (recommendations?.length === 0) {
        errorContainer.textContent = strings.NO_RECOMMENDATIONS_MSG;
      } else {
        recommendations?.forEach((recommendation) => {
          const recommendationCard = createRecommendationCard(
            recommendation,
            isHiddenIfNoImg
          );
          cardsContainer.appendChild(recommendationCard);
        });
      }
    } catch (error) {
      errorContainer.textContent = strings.ERROR_FETCHING_RECOMMENDATIONS_MSG;
      console.error(error.message);
    }
  };

  // Create a button to update recommendations when the button is visible.
  if (isGetNewRecBtnVisible) {
    createShowDiffTopicsButtonElement(
      strings.SHOW_DIFF_TOPICS_BUTTON_TITLE,
      populateRecommendations,
      headerContainer,
      widgetContainer
    );
  }
  // Populate recommendations and append the containers.
  populateRecommendations();

  widgetContainer.appendChild(headerContainer);
  widgetContainer.appendChild(cardsContainer);
  widgetContainer.appendChild(errorContainer);
};
