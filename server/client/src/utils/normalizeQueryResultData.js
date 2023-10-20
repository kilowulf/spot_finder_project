export const normalizeQueryResultData = searchResults => {
  console.log(searchResults);
  return searchResults.map(edge => {
    const repo = edge.node;

    return {
      id: repo.id,
      name: repo.name,
      url: repo.url,
      createdAt: repo.createdAt,
      contributingGuidelinesBody: repo.contributingGuidelines
        ? repo.contributingGuidelines.body
        : null,
      mentionableUsersCount: repo.mentionableUsers
        ? repo.mentionableUsers.totalCount
        : 0,
      description: repo.description,
      isArchived: repo.isArchived,
      starCount: repo.stargazers ? repo.stargazers.totalCount : 0,
      owner: {
        id: repo.owner.id,
        login: repo.owner.login,
        url: repo.owner.url
      },
      assignableUsersCount: repo.assignableUsers
        ? repo.assignableUsers.totalCount
        : 0,
      licenseKey: repo.licenseInfo ? repo.licenseInfo.key : null,
      primaryLanguage: repo.primaryLanguage ? repo.primaryLanguage.name : null,
      languages: repo.languages
        ? repo.languages.edges.map(edge => edge.node.name)
        : [],
      issueCount: repo.issues ? repo.issues.totalCount : 0,
      latestMergedPR:
        repo.pullRequests && repo.pullRequests.edges.length > 0
          ? repo.pullRequests.edges[0].node.mergedAt
          : null
    };
  });
};
