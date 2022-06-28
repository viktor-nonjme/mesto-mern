class Api {
  constructor(options) {
    this.url = options.baseUrl;
    this.headers = options.headers;
  }

  login(email, password) {
    return fetch(`${this.url}/login`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        email,
        password,
      }),
    })
  }

  registration(email, password) {
    return fetch(`${this.url}/registration`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
  }

  getUserInfo(id, token) {
    return fetch(`${this.url}/users/${id}`, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`
      }
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        Promise.reject(`Ошибка: ${res.status}`);
      }
    });
  }

  updateInfo(name, about, id, token) {
    return fetch(`${this.url}/users/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        name,
        about,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        Promise.reject(`Ошибка: ${res.status}`);
      }
    });
  }

  loadCards() {
    return fetch(`${this.url}/cards`, {
      headers: this.headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        Promise.reject(`Ошибка: ${res.status}`);
      }
    });
  }

  postCard(name, link, token) {
    return fetch(`${this.url}/cards`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        name,
        link,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        Promise.reject(`Ошибка: ${res.status}`);
      }
    });
  }

  delete(id, token) {
    return fetch(`${this.url}/cards/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          Promise.reject(`Ошибка: ${res.status}`);
        }
      })
      .then((res) => res);
  }

  like(id, token) {
    return fetch(`${this.url}/cards/${id}/likes`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        Promise.reject(`Ошибка: ${res.status}`);
      }
    });
  }

  avatar(avatar, id, token) {
    return fetch(`${this.url}/users/${id}/avatar`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        avatar,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    });
  }
}

const api = new Api({
  baseUrl: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json"
  }
});

export default api;
