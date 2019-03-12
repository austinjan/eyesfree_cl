import { apiFuzzySearch, apiUpdate, apiCreate } from './crudAPIs';

export const apiGetAllUsers = async () => {
  const response = await fetch('/api/getall/users');
  if (!response.ok) {
    throw Error(response.statusText);
  }
  const data = await response.json();
  return data;
};

export const apiUpdateUser = async (key, newItem) => {
  apiUpdate(key, newItem, 'users');
};

export const apiAddUser = async newItem => {
  apiCreate(newItem, 'users');
};

export const apiFuzzySearchUsers = async searchingText => {
  console.log('userAPIs.js apiSearchUsers searchingText= ', searchingText);

  if (searchingText) {
    const data = await apiFuzzySearch(searchingText, 'users');
    return data;
  }
  const data = await apiGetAllUsers();
  return data;
};
