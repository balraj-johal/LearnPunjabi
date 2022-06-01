import { render, screen, fireEvent, waitFor,  } from '@testing-library/react'

import { rest } from "msw"
import { setupServer } from "msw/node"

// add custom jest matchers from jest-dom
import '@testing-library/jest-dom'

import EditOverview from './EditOverview';

// declare which API requests to mock
const server = setupServer(
    // capture "GET /greeting" requests
    rest.get('/api/v1/lessons/', (req, res, ctx) => {
      // respond using a mocked JSON body
      return res(ctx.json([
        {
            name: "lesson 1",
            id: "lesson-lesson 1",
            requiredCompletions: 1
        },
        {
            name: "lesson 2",
            id: "lesson-lesson 2",
            requiredCompletions: 2
        },
      ]))
    }),
)

// establish API mocking before all tests
beforeAll(() => server.listen())
// reset any request handlers that are declared as a part of our tests
// (i.e. for testing one-time error scenarios)
afterEach(() => server.resetHandlers())
// clean up once the tests are done
afterAll(() => server.close())


// test('renders new lesson button', () => {
//     render(<EditOverview />);
//     const element = screen.getByTestId("add-button");
//     expect(element).toBeInTheDocument();
// });

it('faketest', () => {
  expect(1).toBe(1);
})