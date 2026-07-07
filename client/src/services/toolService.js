import api from "./api";

export const getTools = async (
  page = 1,
  search = ""
) => {
  const response = await api.get("/tools", {
    params: {
      page,
      search,
    },
  });

  return response.data;
};

export const createTool = async (toolData) => {
  const response = await api.post(
    "/tools",
    toolData
  );

  return response.data;
};

export const updateTool = async (
  toolId,
  toolData
) => {
  const response = await api.put(
    `/tools/${toolId}`,
    toolData
  );

  return response.data;
};

export const deleteTool = async (toolId) => {
  const response = await api.delete(
    `/tools/${toolId}`
  );

  return response.data;
};