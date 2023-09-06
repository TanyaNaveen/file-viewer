import { render, screen, cleanup, fireEvent, getAllByRole } from "@testing-library/react";
import SelectFolder from "../SelectFolder";

afterEach(() => {
    cleanup(); // Resets DOM after each test suite
})

describe('Home Page', () => {

    it('renders Home page correctly', () => {
        const { container } = render(<SelectFolder />);
        expect(container).toMatchSnapshot();
    });

    // want to check that clicking the go button actually goes to next page
    // only when an option has been selected
    // otherwise it should alert the user    

    test ('go button renders', () => {
        render(<SelectFolder />)
        expect(screen.getByRole('button', { name: 'Go'})).toBeInTheDocument();
    })

    test ('go button: does nothing when no option selected', () => {
        const { container } = render(<SelectFolder handleGo={() => 2} />); // pass in dummy callback
        const button = screen.getByTestId("button");

        fireEvent.click(button);
        expect(container).toMatchSnapshot(); // since no option has been selected, page should not change
        
        jest.spyOn(window, 'alert').mockImplementation(() => {});

    
    })

    it('dropdown renders', () => {
        render(<SelectFolder />)
        const dropdown = screen.getByTestId("dropdown");
        const display = dropdown.children[0];
        expect(display.textContent).toBe("Select an option");
        fireEvent.click(dropdown);
        // screen.getByRole('option');
        // const dropdownOptions = getAllByRole(dropdown, 'option', {hidden: true});

    });
})