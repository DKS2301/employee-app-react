import { applyMiddleware, createStore } from "redux";

export type RootState = ReturnType<typeof rootReducer>;

const store = createStore(
    rootReducer,
    undefined,
    composedWithDevTools(applyMiddleware(logger))
);

export default store;