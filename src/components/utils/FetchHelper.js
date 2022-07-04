export const getFetch = async (resource) => {
  try {
    const resp = await fetch(`${process.env.REACT_APP_BASE_URL}/${resource}`);
    const dataFromApi = await resp.json();
    return dataFromApi;
  } catch (error) {
    return false;
  }
};

export const getFetchWithToken = async (resource) => {
    try {
      const token = localStorage.getItem('token');
      const resp = await fetch(`${process.env.REACT_APP_BASE_URL}/${resource}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const dataFromApi = await resp.json();
      return dataFromApi;
    } catch (error) {
      return false;
    }
};

export async function deleteFetch(resource, id) {
    try {
      const token = localStorage.getItem('token');
      const resp = await fetch(`${process.env.REACT_APP_BASE_URL}/${resource}/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      const dataInJS = await resp.json();
      return dataInJS;
    } catch (error) {
      return false;
    }
}
  
export async function sendFetchWithToken(resource, dataToPost) {
    try {
      const token = localStorage.getItem('token');
      const resp = await fetch(`${process.env.REACT_APP_BASE_URL}/${resource}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
  
        body: JSON.stringify(dataToPost),
      });
      const dataInJS = await resp.json();
      if (dataInJS.msg === 'Successfully logged in') {
        localStorage.setItem('token', dataInJS.token);
      }
      return dataInJS;
    } catch (error) {
      return false;
    }
}

export async function sendCreateFetch(resource, dataToCreate) {
  try {
    const token = localStorage.getItem('token');
    const resp = await fetch(`${process.env.REACT_APP_BASE_URL}/${resource}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },

      body: JSON.stringify(dataToCreate),
    });
    const dataInJS = await resp.json();
    return dataInJS;
  } catch (error) {
    return false;
  }
}

export async function sendRegLogFetch(resource, dataForRegLog) {
  try {
    const resp = await fetch(`${process.env.REACT_APP_BASE_URL}/auth/${resource}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataForRegLog),
    });
    const dataInJS = await resp.json();
    return dataInJS;
  } catch (error) {
    return false;
  }
}



export async function sendUpdateFetch(resource, dataToUpdate) {
    try {
      const token = localStorage.getItem('token');
      const resp = await fetch(`${process.env.REACT_APP_BASE_URL}/${resource}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
  
        body: JSON.stringify(dataToUpdate),
      });
      const dataInJS = await resp.json();
      return dataInJS;
    } catch (error) {
      return false;
    }
}
  
