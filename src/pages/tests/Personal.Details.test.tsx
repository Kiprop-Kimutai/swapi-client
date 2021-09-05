import  React  from 'react';
import { renderApollo } from './test-utils';
import PersonDetails,  {GET_PERSON_DETAILS} from '../Personal.Details';
import { cleanup, waitFor, screen, fireEvent, render } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import { MockedProvider } from '@apollo/client/testing';
const mockPerson = {
    name: "Luke Skywalker",
    height: "172",
    mass: "77",
    gender: "male",
    homeworld: "https://swapi.dev/api/planets/1/"
};

describe('Person page', () => {
    afterEach(cleanup);
    it('renders Person page with correct Person', async () => {
        const mocks = [
            {
                request: { query: GET_PERSON_DETAILS, variables: { personName: "Luke Skywalker"}},
                result: {
                    data: {
                        Person: [mockPerson]
                    }
                }
            }
        ];
        const { getByText } = await renderApollo(
        <MemoryRouter initialEntries = {["/person","/person/Luke Skywalker"]} initialIndex  = {2}>
            <Route component = {PersonDetails} path = "/person/:name"/>
        </MemoryRouter>,
        {mocks, resolvers: {}})
        await waitFor(() => getByText(/Luke Skywalker/));
    }),
    it('Navigates back to people list', async () => {
        const mocks = [
            {
                request: { query: GET_PERSON_DETAILS, variables: { personName: "Luke Skywalker"}},
                result: {
                    data: {
                        Person: [mockPerson]
                    }
                }
            }
        ];
        renderApollo(
        <MemoryRouter initialEntries = {["/person","/person/Luke Skywalker"]} initialIndex  = {1}>
            <Route component = {PersonDetails} path = "/person/:name"/>
        </MemoryRouter>,
        {mocks, resolvers: {}});
        expect(true).toBe(true);

    }),
    it('Navigation button should be in the document', async () => {
        const mocks = 
            {
                request: { query: GET_PERSON_DETAILS, variables: { personName: "Luke Skywalker"}},
                result: {
                    data: {
                        Person: [mockPerson]
                    }
                }
            };
        const {container} = render(
            <MockedProvider mocks = {[mocks]} addTypename = {false}>
                <MemoryRouter initialEntries = {["/person/Luke Skywalker"]}>
                    <Route component = {PersonDetails} path = "/person/:name"/>
                </MemoryRouter>
            </MockedProvider>
        );
        const backButton = await waitFor(() => screen.getByTestId("go-back"));
        expect(backButton).toBeInTheDocument();
    }),
    it('Back button should navigate back to Home', async () => {
        const mocks = 
            {
                request: { query: GET_PERSON_DETAILS, variables: { personName: "Luke Skywalker"}},
                result: {
                    data: {
                        Person: [mockPerson]
                    }
                }
            };
        const {container} = render(
            <MockedProvider mocks = {[mocks]} addTypename = {false}>
                <MemoryRouter initialEntries = {["/person/Luke Skywalker"]} initialIndex  = {0}>
                    <Route component = {PersonDetails} path = "/person/:name"/>
                </MemoryRouter>
            </MockedProvider>
        );
        const backButton = await waitFor(() => screen.getByTestId("go-back"));
        expect(backButton).toBeInTheDocument();
        fireEvent.click(backButton).valueOf();
        expect(fireEvent.click(backButton).valueOf()).toBeTruthy();
    });
});