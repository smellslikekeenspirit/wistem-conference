import React from "react";
import { render, fireEvent } from "@testing-library/react";

import "@testing-library/jest-dom/extend-expect";

import App from "./App";
import AddPage from "./components/AddPage";

import HomePage from "./components/HomePage";
import PickPage from "./components/PickPage";
import BookPage from "./components/BookPage";
import SearchResult from "./components/SearchResult";
import TitleEdit from "./components/TitleEdit";

it("assigns the correct document title to the Home Page", () => {
	render(<HomePage />);
	expect(document.title).toBe("Home Page");
});

it("assigns the correct document title to the Add Page", () => {
	render(<AddPage />);
	expect(document.title).toBe("Add A Recipe");
});

it("assigns the correct document title to the Pick Page", () => {
	render(<PickPage />);
	expect(document.title).toBe("Pick For Me");
});

it("assigns the correct document title to the Book Page", () => {
	render(<BookPage />);
	expect(document.title).toBe("Recipe Book");
});

it("renders the home page initially", () => {
	render(<App />);
	expect(document.title).toBe("Home Page");
});

it("renders the add page when you click the navbar link", () => {
	const { getByTestId } = render(<App />);
	fireEvent.click(getByTestId("add-navbar"));
	expect(document.title).toBe("Add A Recipe");
});

it("renders the pick page when you click the navbar link", () => {
	const { getByTestId } = render(<App />);
	fireEvent.click(getByTestId("pick-navbar"));
	expect(document.title).toBe("Pick For Me");
});

it("renders the book page when you click the navbar link", () => {
	const { getByTestId } = render(<App />);
	fireEvent.click(getByTestId("book-navbar"));
	expect(document.title).toBe("Recipe Book");
});

it("generates a random recipe or displays an error message on the pick page", async () => {
	const { queryByTestId } = render(<PickPage />);

	(expect(queryByTestId("cant-pick")).toBe(null) &&
		expect(queryByTestId("random-recipe")).toBe(!null)) ||
		(expect(queryByTestId("random-recipe")).toBe(null) &&
			expect(queryByTestId("cant-pick")).toBe(!null));
});

it("displays the saved recipes or an error message on the book page", async () => {
	const { queryByTestId } = render(<BookPage />);

	(expect(queryByTestId("no-book-results")).toBe(null) &&
		expect(queryByTestId("favorited-recipes")).toBe(!null)) ||
		(expect(queryByTestId("favorited-recipes")).toBe(null) &&
			expect(queryByTestId("no-book-results")).toBe(!null));
});

it("shows the edit button when edit mode is enabled on a search result", async () => {
	const { queryByTestId } = render(
		<SearchResult
			name="hi"
			author="there"
			favorited={true}
			viewDetails={() => {}}
			favoriteFunction={() => {}}
			canEdit={true}
			showNotification={() => {}}
			reloadFavorites={() => {}}
		/>
	);
	expect(queryByTestId("edit-button")).toBeTruthy();
});

it("hides the edit button when edit mode is disabled on a search result", async () => {
	const { queryByTestId } = render(
		<SearchResult
			name="hi"
			author="there"
			favorited={true}
			viewDetails={() => {}}
			favoriteFunction={() => {}}
			canEdit={false}
			showNotification={() => {}}
			reloadFavorites={() => {}}
		/>
	);
	expect(queryByTestId("edit-button")).toBeFalsy();
});

it("calls the favorite function when clicking the favorite button", async () => {
	const favoriteFunctionHandler = jest.fn();

	const { getByTestId } = render(
		<SearchResult
			name="hi"
			author="there"
			favorited={true}
			viewDetails={() => {}}
			favoriteFunction={favoriteFunctionHandler}
			canEdit={false}
			showNotification={() => {}}
			reloadFavorites={() => {}}
		/>
	);
	fireEvent.click(getByTestId("favorite-button"));
	expect(favoriteFunctionHandler).toHaveBeenCalled();
});

it("calls the view details function when clicking the details button", async () => {
	const viewDetailsHandler = jest.fn();

	const { getByTestId } = render(
		<SearchResult
			name="hi"
			author="there"
			favorited={true}
			viewDetails={viewDetailsHandler}
			favoriteFunction={() => {}}
			canEdit={false}
			showNotification={() => {}}
			reloadFavorites={() => {}}
		/>
	);
	fireEvent.click(getByTestId("details-button"));
	expect(viewDetailsHandler).toHaveBeenCalled();
});

it("displays an input when clicking edit mode on a search result", async () => {
	const { getByTestId, queryByTestId } = render(
		<SearchResult
			name="hi"
			author="there"
			favorited={true}
			viewDetails={() => {}}
			favoriteFunction={() => {}}
			canEdit={true}
			showNotification={() => {}}
			reloadFavorites={() => {}}
		/>
	);
	fireEvent.click(getByTestId("edit-button"));
	expect(queryByTestId("result-title-text")).toBeFalsy();
});

it("turns off edit mode on enter if input hasn't changed", async () => {
	const turnOffEditModeHandler = jest.fn();
	const { getByTestId } = render(
		<TitleEdit
			title="Test Title"
			author="Test Author"
			turnOffEditMode={turnOffEditModeHandler}
			updateTitle={() => {}}
			showNotification={() => {}}
			reloadFavorites={() => {}}
		/>
	);
	let textInput = getByTestId("title-input");
	fireEvent.keyUp(textInput, {
		keyCode: 13
	});
	expect(turnOffEditModeHandler).toHaveBeenCalled();
});

it("turns off edit mode on ESC", async () => {
	const turnOffEditModeHandler = jest.fn();
	const { getByTestId } = render(
		<TitleEdit
			title="Test Title"
			author="Test Author"
			turnOffEditMode={turnOffEditModeHandler}
			updateTitle={() => {}}
			showNotification={() => {}}
			reloadFavorites={() => {}}
		/>
	);
	let textInput = getByTestId("title-input");
	fireEvent.keyUp(textInput, {
		keyCode: 27
	});
	expect(turnOffEditModeHandler).toHaveBeenCalled();
});

it("displays an error message on an invalid input", async () => {
	const { getByTestId } = render(
		<TitleEdit
			title="Test Title"
			author="Test Author"
			turnOffEditMode={() => {}}
			updateTitle={() => {}}
			showNotification={() => {}}
			reloadFavorites={() => {}}
		/>
	);
	let textInput = getByTestId("title-input");
	fireEvent.change(textInput, { target: { value: "" } });
	fireEvent.keyUp(textInput, {
		keyCode: 13
	});

	const error = getByTestId("title-input-error");
	expect(error).toHaveClass("visible");
});
