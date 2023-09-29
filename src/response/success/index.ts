export type SuccessResponse = {
  result: boolean;
  message: string;
  data: object;
};
export const setSuccessResponse = (message: string, data: object = null) => {
  return {
    result: true,
    message: message,
    data: data,
  };
};
