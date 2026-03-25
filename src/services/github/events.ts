export async function getPublicUserEvents(username: string) {
  const url = `/api/github/activity/publicUserEvents?username=${username}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      const errorData = await response.json();

      throw new Error(errorData.message);
    }

    return await response.json();
  } catch (error) {
    console.error("Failed to fetch events: ", error);
    throw error;
  }
}
