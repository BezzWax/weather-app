import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { CityAdd } from "../../components/CityAdd";

const mockStore = configureStore([]);

describe( "Add function", () => {
    test("renders CityAdd component", () => {
        const store = mockStore({ city: { cityForecast: [] } });

        render(
          <Provider store={store}>
            <CityAdd />
          </Provider>
        );

        expect(screen.getByPlaceholderText("Enter city name")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /add/i })).toBeInTheDocument();
    });

    test('Add new city', () => {
        const store = mockStore({city: {cityForecast: []}});
        store.dispatch = jest.fn();

        render(
            <Provider store={store}>
                <CityAdd />
            </Provider>
        );

        const input = screen.getByPlaceholderText("Enter city name");
        const button = screen.getByRole("button", { name: /add/i });

        fireEvent.change(input, { target: {value: 'Poltava'} });
        fireEvent.click(button);

        expect(store.dispatch).toHaveBeenCalledWith({ type: 'ADD', payload: 'Poltava' });
    });

    test("check dublicate city", () => {
        const store = mockStore({
            city: { cityForecast: [{ city: 'Odesa' }] ,}
        });

        render (
            <Provider store={store}>
                <CityAdd />
            </Provider>
        );

        const input = screen.getByPlaceholderText('Enter city name');
        const button = screen.getByRole("button", { name: /add/i });

        fireEvent.change(input, { target: { value: 'Odesa' } });
        fireEvent.click(button);

        expect(screen.getByText("City already added")).toBeInTheDocument();

    });


      

});


