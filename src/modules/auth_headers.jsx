export const getAuthHeaders = () => {
  return {
    "access-token": localStorage.getItem("access-token"),
    "token-type": "Bearer",
    "client": localStorage.getItem("client"),
    "content-type": "application/json; charset=utf-8",
    "uid": localStorage.getItem('uid'),
    "cache-control": "max-age=0, private, must-revalidate",
    "expiry": localStorage.getItem("expiry"),
  }
};