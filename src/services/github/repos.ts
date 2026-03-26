export async function getUserRepos(username: string) {
  const url = `/api/github/repos/listForUser?username=${username}`;

  try {
    const response = await fetch(url);

    if (response.status === 401) {
      window.location.href = "/api/auth/login";
    }
    if (!response.ok) {
      const errorData = await response.json();

      throw new Error(errorData.message);
    }

    return await response.json();
  } catch (error) {
    console.error("Failed to fetch repos: ", error);
    throw error;
  }
}
