import React from 'react';
import { InMemoryCache } from '@apollo/client';
import { renderApollo } from './test-utils';
import { cleanup, waitFor, screen, render } from '@testing-library/react';
import Home, {GET_PEOPLE} from '../pages/Home';
import { MockedProvider } from '@apollo/client/testing';
const mockPeople = {
    name: "R2-D2",
    height: "96",
    gender: "n/a",
    homeworld: "https://swapi.dev/api/planets/8/"
};

describe(`People's Page`, () => {
    // unmount and cleanup DOM after test is finished
    afterEach(cleanup);
    it(`renders People's page with listed users`, async() => {
        const cache = new InMemoryCache({addTypename: false});
        const mocks = [
            {
                request: { query: GET_PEOPLE, variables: {peoplePageNumber: 1}},
                result: {
                    data: {
                        People: {
                            People: [mockPeople],
                            Pagination: {
                                nextPage: 2,
                                hasMore: true,
                                previousPage: null
                            }
                        }
                    }
                }
            }
        ];
        const {getByText} = await renderApollo(<Home/>, {mocks, resolvers: {}});
        await waitFor(() => getByText(/R2-D2/));
    }),
    it('Should render list with correct number of People', async () => {
        const mocks = [
            {
                request: { query: GET_PEOPLE, variables: {peoplePageNumber: 1}},
                result: {
                    data: {
                        People: {
                            People: [mockPeople],
                            Pagination: {
                                nextPage: 2,
                                hasMore: true,
                                previousPage: null
                            }
                        }
                    }
                }
            }
        ];

        const { container } = render(
            <MockedProvider mocks = {mocks} addTypename = {false}>
                <Home/>
            </MockedProvider>
        );
        const peopleList = await waitFor(() => screen.findAllByTestId("listItem"));
        expect(peopleList).toHaveLength(1);
    })

});
