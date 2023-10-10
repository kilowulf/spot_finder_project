const { gql } = require("@apollo/client");
const client = require("./githubService");

// query to find public repos: open source
const SEARCH_QUERY = gql`
  query SearchRepositories(
    $searchTerm: String!
    $after: String
    $issueLabels: [String!]!
  ) {
    search(query: $searchTerm, type: REPOSITORY, first: 20, after: $after) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        node {
          ... on Repository {
            id
            name
            url
            createdAt
            contributingGuidelines {
              body
            }
            mentionableUsers {
              totalCount
            }
            description
            isArchived
            stargazers {
              totalCount
            }
            owner {
              id
              login
              url
              __typename
            }
            assignableUsers {
              totalCount
            }
            licenseInfo {
              key
            }
            primaryLanguage {
              name
            }
            languages(first: 5) {
              edges {
                node {
                  name
                }
              }
            }
            issues(labels: $issueLabels, states: OPEN, first: 10) {
              totalCount
              edges {
                node {
                  id
                  body
                  createdAt
                }
              }
            }
            pullRequests(last: 1, states: MERGED) {
              edges {
                node {
                  mergedAt
                }
              }
            }
          }
        }
      }
    }
  }
`;

const searchGithub = async ({ searchTerm, issueLabels, after }) => {
  try {
    const result = await client.query({
      query: SEARCH_QUERY,
      variables: {
        searchTerm,
        issueLabels,
        after
      }
    });

    const data = result.data;
    const endCursor = data.search.pageInfo.endCursor;

    return {
      data,
      endCursor
    };
  } catch (error) {
    console.error("Error fetching from GitHub:", error);
    throw error;
  }
};

module.exports = { searchGithub };
