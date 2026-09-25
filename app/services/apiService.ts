export async function apiService<T = any>(
  endpoint: string,
  method: "GET" | "POST" = "GET",
  data?: any
): Promise<T> {
  const res = await fetch(endpoint, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: method === "POST" && data ? JSON.stringify(data) : undefined,
  });

  return res.json();
}

apiService.get = <T = any>(endpoint: string) => apiService<T>(endpoint, "GET");
apiService.post = <T = any>(endpoint: string, data?: any) =>
  apiService<T>(endpoint, "POST", data);

export default apiService;
