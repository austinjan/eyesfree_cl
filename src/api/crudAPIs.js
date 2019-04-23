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
  const ret = await response.json();
  return ret;
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

export const apiRemove = async (keys, collection) => {
  const response = await fetch(`/api/remove/${collection}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(keys),
  });
  if (!response.ok) {
    throw Error(response.statusText);
  }

  const ret = await response.json();
  console.log('const apiRemove ret=', ret);
  return ret;
};

// Standard CRUD API (method: GET,PUT,PATCH,DELETE,POST)
export const createCrudUrl = (collection, query) => {
  let crudUrl = `/apis/v1/${collection}`;
  let searchParams = new URLSearchParams(query);
  console.log(`url query: ${searchParams}`);
  crudUrl = `${crudUrl}?${searchParams}`;
  console.log(`url created: ${crudUrl}`);
  return crudUrl;
};
