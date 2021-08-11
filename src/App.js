import { BrowserRouter, Route, Switch } from "react-router-dom";
import { AppContextProvider } from "./contexts";
import { CalculatorProvider } from "./contexts/calculator/calculator";
import TodoProvider from "./contexts/todos";
import { routesConfig } from "./routes-config";
import "./styles/tailwind.css";

export function App() {
  return (
    <AppContextProvider
      initNotification={{
        message: "This text is read from context.notification ",
      }}
    >
      <CalculatorProvider>
        <TodoProvider>
          <div className="w-full">
            <BrowserRouter>
              <Switch>
                {routesConfig.map(({ path, exact, component: Component }) => (
                  <Route key={path} exact={exact} path={path} component={Component} />
                ))}
              </Switch>
            </BrowserRouter>
          </div>
        </TodoProvider>
      </CalculatorProvider>
    </AppContextProvider>
  );
}
