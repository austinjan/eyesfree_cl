import { apiFuzzySearch, apiUpdate, apiCreate, apiRemove } from './crudAPIs';

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
  const response = await apiCreate(newItem, 'users');
  return response;
};

export const apiRemoveUsers = async keys => {
  const response = await apiRemove(keys, 'users');
  return response;
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
