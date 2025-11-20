interface LoginResponse {
  message: string;
  statusCode: number;
  request: {
    method: string;
    description: string;
    url: string;
    token: string;
  };
}
