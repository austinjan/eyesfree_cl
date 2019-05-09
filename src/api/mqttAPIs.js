// Fetch APIs
// Get data
export async function fetchMqttDatas(setLoading) {
  try {
    const _setLoading = setLoading || (a => {});

    _setLoading(true);
    const response = await fetch(`/apis/v1/mqtt`);
    _setLoading(false);
    if (!response.ok) {
      throw new Error(`Server error: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (e) {
    throw e;
  }
}

// Fetch GET /api/mqtt/topics
// arg: setResult
export async function fetchMqttTopics(setLoading) {
  try {
    const _setLoading = setLoading || (a => {});
    _setLoading(true);
    const response = await fetch(`/api/mqtt/topics`);
    _setLoading(false);
    if (!response.ok) {
      throw new Error(`Server error: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (e) {
    throw e;
  }
}

export async function fetchMqttSettings(setLoading) {
  try {
    const _setLoading = setLoading || (a => {});
    _setLoading(true);
    const response = await fetch(`/apis/v1/mqttsettings`);
    _setLoading(false);
    if (!response.ok) {
      throw new Error(`Server error: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (err) {
    throw err;
  }
}

export async function fetchMqttStatus(setLoading) {
  try {
    const _setLoading = setLoading || (a => {});
    _setLoading(true);
    const response = await fetch(`/api/mqtt/status`);
    _setLoading(false);
    if (!response.ok) {
      throw new Error(`Server error: ${response.statusText}`);
    }
    const data = await response.json();
    const { connected } = data;
    return connected;
  } catch (e) {
    throw e;
  }
}
