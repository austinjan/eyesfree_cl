import Url from 'url-parse';

export const apiCreate = async (item, collection) => {
  const response = await fetch(`/api/add/${collection}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(item),
  });
  if (!response.ok) {
    throw Error(response.statusText);
  }
};

export const apiFuzzySearch = async (searchingText, collection) => {
  let url = new Url(`/api/fuzzysearch/${collection}/${searchingText}`);

  const response = await fetch(url);
  if (!response.ok) {
    throw Error(response.statusText);
  }
  const data = await response.json();
  console.log('crudAPIs.js apiSearch() response.body = ', data);
  return data;
};

export const apiUpdate = async (key, newItem, collection) => {
  const response = await fetch(`/api/update/${collection}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ key, newItem }),
  });
  //console.log('POST update device response', response);
  if (!response.ok) {
    throw Error(response.statusText);
  }
};
