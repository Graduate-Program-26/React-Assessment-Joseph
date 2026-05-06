export async function searchUsers(query = "", page_param = 1, per_page = 10) {
  const url = `/api/github/user/search?query=${encodeURIComponent(query)}&page=${page_param}&per_page=${per_page}`;

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
    console.error("Failed to fetch users: ", error);
    throw error;
  }
}

export async function getUser(username: string) {
  const url = `/api/github/user/getUser?username=${encodeURIComponent(username)}`;

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
    console.error("Failed to fetch user: ", error);
    throw error;
  }
}
