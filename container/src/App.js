import React from "react";
import { BrowserRouter } from "react-router-dom";
import MarketingApp from "./components/MarketinApp";
import {
  StylesProvider,
  createGenerateClassName,
} from "@material-ui/core/styles";
import Header from "./components/Header";
const generateClassName = createGenerateClassName({
  productionPrefix: "cn",
});

export default () => {
  return (
    <StylesProvider generateClassName={generateClassName}>
      <BrowserRouter>
        <div>
          <Header />
          <MarketingApp />
        </div>
      </BrowserRouter>
    </StylesProvider>
  );
};
