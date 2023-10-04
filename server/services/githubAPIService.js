const axios = require("axios");

const BASE_URL = "https://api.github.com";

const githubService = {
  searchRepos: async query => {
    try {
      const response = await axios.get(`${BASE_URL}/search/repositories`, {
        params: {
          q: query,
          sort: "stars", // sorting by stars
          order: "desc"
        }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

module.exports = githubService;
