import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import auth from "./auth";
import buses from "./buses";
import students from "./students";
import statuses from './statuses';
import users from './users';

const reducer = combineReducers({ auth, buses, students, statuses, users });
const middleware = applyMiddleware(
  thunkMiddleware,
  createLogger({ collapsed: true })
);
const store = createStore(reducer, middleware);

export default store;
export * from "./auth";
export * from "./buses";
export * from './students';
export * from './statuses';
export * from './users';
