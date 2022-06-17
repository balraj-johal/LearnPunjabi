import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import rootReducer from "../reducers/index";

function render(
    ui,
    {
        preloadedState,
        store = configureStore({ 
            reducer: rootReducer,
            preloadedState
        }),
        ...renderOptions
    } = {}
) {
    function Wrapper({ children }) {
        return (
            <Provider store={store}>
                {children}
            </Provider>
        );
    }
    return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}


function MockRouterWrap({ children, ...props }) {
    return(
        <MemoryRouter initialEntries={props.initialEntries} >
            { children }
        </MemoryRouter> 
    )
}

// re-export everything
export * from '@testing-library/react';
// override render method
export { render, MockRouterWrap };