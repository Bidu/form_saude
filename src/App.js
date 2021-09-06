import React from "react";
import { Header } from "./components/header";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import Routes from "./routes";
import { Provider } from "react-redux";
import store from "./store";
import WhatsApp from "./components/WhatsApp";


const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#00f1e7",
    },
    secondary: {
      main: "#FE7B00",
    },
    dark: {
      main: "#393F4D",
    },
    lightGray: {
      main: "#E4EAEE",
    },
    darkGray: {
      main: "#9FB1C2",
    },
    orange: {
      main: "#FE7B00",
    },
  },
});

function App() {
  const obj = [];
  if (!localStorage.getItem("@bidu2/user")) {
    localStorage.setItem("@bidu2/user", JSON.stringify(obj));
  }
  if (!localStorage.getItem("@bidu2/brufselect")) {
    localStorage.setItem("@bidu2/brufselect", JSON.stringify(obj));
  }
  if (!localStorage.getItem("@bidu2/veiculo")) {
    localStorage.setItem("@bidu2/veiculo", JSON.stringify(obj));
  }
  if (!localStorage.getItem("@bidu2/seu-veiculo")) {
    localStorage.setItem("@bidu2/seu-veiculo", JSON.stringify(obj));
  }
  if (!localStorage.getItem("@bidu2/utilizacao")) {
    localStorage.setItem("@bidu2/utilizacao", JSON.stringify(obj));
  }
  if (!localStorage.getItem("@bidu2/passa_noite")) {
    localStorage.setItem("@bidu2/passa_noite", JSON.stringify(obj));
  }
  if (!localStorage.getItem("@bidu2/seguro")) {
    localStorage.setItem("@bidu2/seguro", JSON.stringify(obj));
  }
  if (!localStorage.getItem("@bidu2/condutor")) {
    localStorage.setItem("@bidu2/condutor", JSON.stringify(obj));
  }
  if (!localStorage.getItem("@bidu2/dados_cotacao")) {
    localStorage.setItem("@bidu2/dados_cotacao", JSON.stringify(obj));
  }
  if (!localStorage.getItem("@bidu2/cotacao")) {
    localStorage.setItem("@bidu2/cotacao", JSON.stringify(obj));
  }
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <div className="App">
          <Header />
          <WhatsApp />
          <Routes />
        </div>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
