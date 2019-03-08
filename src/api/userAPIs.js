export const apiGetAllUsers = async () => {
  const response = await fetch('/api/getall/users');
  if (!response.ok) {
    throw Error(response.statusText);
  }
  const data = await response.json();
  console.log('apiGetAllUsers %o', data);
  return data;
};
