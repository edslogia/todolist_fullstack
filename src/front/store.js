export const initialStore = () => {
  return {
    message: null,
    user: null,
    isAuthenticated: false,
    todos: [
      {
        id: 1,
        title: "Make the bed",
        background: null,
      },
      {
        id: 2,
        title: "Do my homework",
        background: null,
      },
    ],
  };
};

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case "set_hello":
      return {
        ...store,
        message: action.payload,
      };

    case "add_task":
      const { id, color } = action.payload;

      return {
        ...store,
        todos: store.todos.map((todo) =>
          todo.id === id ? { ...todo, background: color } : todo
        ),
      };

    case "login":
      const { token, user } = action.payload;
      // Guardar el token en localStorage
      localStorage.setItem("access_token", token);
      return {
        ...store,
        user: user,
        isAuthenticated: true,
      };

    case "logout":
      // Limpiar el token del localStorage
      localStorage.removeItem("access_token");
      return {
        ...store,
        user: null,
        isAuthenticated: false,
      };

    case "check_auth":
      // Verificar si hay un token válido al inicializar la app
      const storedToken = localStorage.getItem("access_token");
      if (storedToken) {
        try {
          const tokenPayload = JSON.parse(atob(storedToken.split(".")[1]));
          const currentTime = Date.now() / 1000;
          if (tokenPayload.exp > currentTime) {
            return {
              ...store,
              isAuthenticated: true,
              user: tokenPayload, // O los datos del usuario que contenga el token
            };
          }
        } catch (error) {
          console.error("Error al verificar el token:", error);
        }
      }
      localStorage.removeItem("access_token");
      return {
        ...store,
        isAuthenticated: false,
        user: null,
      };

    default:
      throw Error("Unknown action.");
  }
}
