const API_URL = "https://app-tq3o5pftgq-uc.a.run.app";



export const getEvents = async () => {
  try {
    const response = await fetch(`${API_URL}/api/events`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error;
  }
};

export const createEvent = async (eventData) => {
  try {
    const response = await fetch(`${API_URL}/api/new-event`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(eventData),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating event:", error);
    throw error;
  }
};
