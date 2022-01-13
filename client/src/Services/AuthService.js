export default {
  login: (user) => {
    return fetch("/user/login", {
      method: "post",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }).then((res) => {
      if (res.status !== 401) return res.json().then((data) => data);
      else if (res.status == 401) {
        return { message: { msgBody: "Sorry, we can't find an account with this username or password. Please try again or contact our IT department.", msgError: true } };
      } else return { isAuthenticated: false, user: { username: "", role: "" } };
    });
  },

  logout: () => {
    return fetch("/user/logout")
      .then((res) => res.json())
      .then((data) => data);
  },
  isAuthenticated: () => {
    return fetch("/user/authenticated").then((res) => {
      if (res.status !== 401) return res.json().then((data) => data);
      else return { isAuthenticated: false, user: { username: "", companyname: "", role: "" } };
    });
  },
};
