"use client";

import ClickEvent from "./ClickEvent";
import PassingDataOnEvent from "./PassingDataOnEvent";
import PassingFunctions from "./PassingFunctions";
import Counter from "./Counter";
import BooleanStateVariables from "./BooleanStateVariables";
import StringStateVariables from "./StringStateVariables";
import DateStateVariable from "./DateStateVariable";
import ObjectStateVariable from "./ObjectStateVariable";
import ArrayStateVariable from "./ArrayStateVariable";
import ParentStateComponent from "./ParentStateComponent";
import Link from "next/link";
import ReduxExamples from "./redux/page";
import store from "./store";
import { Provider } from "react-redux";
import { Nav, NavItem, NavLink } from "react-bootstrap";

export default function Lab4() {
  function sayHello() {
    alert("Hello");
  }

  return (
    <Provider store={store}>
      <div id="wd-passing-functions">
        <h2>Lab 4</h2>
        <ClickEvent />
        <PassingDataOnEvent />
        <PassingFunctions theFunction={sayHello} />
        <Counter />
        <BooleanStateVariables />
        <StringStateVariables />
        <DateStateVariable />
        <ObjectStateVariable />
        <ArrayStateVariable />
        <ParentStateComponent />
        <ReduxExamples />
        <Nav variant="pills" className="mb-2">
          <NavItem>
            <NavLink as={Link} href="/labs/lab4/redux">
              Redux Examples
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink as={Link} href="/labs/lab4/react-context">
              React Context Examples
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink as={Link} href="/labs/lab4/zustand">
              Zustand Examples
            </NavLink>
          </NavItem>
        </Nav>
      </div>
    </Provider>
  );
}
