import { useEffect, useReducer } from "react";
import BookCard, { BookCardProps } from "./components/BookCard/bookCard";
import "./App.css";

type AuthorInfo = {
  name: string;
  age: number;
  gender: string;
  books: BookInfo[];
};

type BookInfo = {
  name: string;
  type: string;
};

enum ActionKind {
  StoreAuthors,
  UpdateMaleHeader,
  UpdateFemaleHeader,
  MaleAuthoredBooks,
  FemaleAuthoredBooks,
}

type StateType = {
  authorList?: AuthorInfo[];
  maleHeader?: string;
  femaleHeader?: string;
  maleAuthoredBooks?: string[];
  femaleAuthoredBooks?: string[];
};

type ActionType = {
  type: ActionKind;
  booksPayload?: string[];
  headerPayload?: string;
  authorsPayload?: AuthorInfo[];
};

function reducer(state: StateType, action: ActionType): StateType {
  const { type, headerPayload, booksPayload, authorsPayload } = action;

  switch (type) {
    case ActionKind.UpdateMaleHeader:
      return { ...state, maleHeader: headerPayload };
    case ActionKind.UpdateFemaleHeader:
      return { ...state, femaleHeader: headerPayload };
    case ActionKind.MaleAuthoredBooks:
      return { ...state, maleAuthoredBooks: booksPayload };
    case ActionKind.FemaleAuthoredBooks:
      return { ...state, femaleAuthoredBooks: booksPayload };
    case ActionKind.StoreAuthors:
      return { ...state, authorList: authorsPayload };
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, {
    authorList: [],
    maleHeader: "Books with Male Owners",
    femaleHeader: "Books with Female Owners",
    maleAuthoredBooks: [] as string[],
    femaleAuthoredBooks: [] as string[],
  } as StateType);

  useEffect(() => {
    (async function GetAuthorListAsync() {
      const authors = await (
        await fetch("http://localhost:8764/authors")
      ).json();

      dispatch({ type: ActionKind.StoreAuthors, authorsPayload: authors.List });
      dispatch({
        type: ActionKind.MaleAuthoredBooks,
        booksPayload: GetAuthorListByGender("Male", authors.List),
      });
      dispatch({
        type: ActionKind.FemaleAuthoredBooks,
        booksPayload: GetAuthorListByGender("Female", authors.List),
      });
    })();
  }, []);

  function GetAuthorListByGender(
    gender: string,
    authors: AuthorInfo[],
    isForHardCover = false
  ) {
    const hardcoverBookType = "Hardcover";
    let filteredBooks: string[] = [];

    const filteredAuthorsByGender = authors.filter(
      (author) => author.gender === gender
    );

    const authorsWithBooks = filteredAuthorsByGender.filter(
      (x) => x.books != null
    );

    if (isForHardCover) {
      let hardcoverBooks: BookInfo[] = [];
      for (const author of authorsWithBooks) {
        hardcoverBooks.push(
          ...author.books.filter((x) => x.type === hardcoverBookType)
        );
      }

      hardcoverBooks.forEach((book) => filteredBooks.push(book.name));

      return filteredBooks.sort();
    }

    for (const author of authorsWithBooks) {
      author.books.forEach((book) => filteredBooks.push(book.name));
    }

    return filteredBooks.sort();
  }

  return (
    <section>
      <nav>
        <header>Owner and Books</header>
      </nav>
      <div className="box-wrapper">
        <div className="box-container">
          <div className="cards-container">
            <BookCard
              cardHeader={state.maleHeader}
              authorList={state.maleAuthoredBooks}
            />
            <BookCard
              cardHeader={state.femaleHeader}
              authorList={state.femaleAuthoredBooks}
            />
          </div>
          <div className="buttons-wrapper">
            <hr />
            <div className="buttons-container">
              <button
                onClick={() => {
                  dispatch({
                    type: ActionKind.UpdateMaleHeader,
                    headerPayload: "Hardcover Books with Male Owners",
                  });
                  dispatch({
                    type: ActionKind.UpdateFemaleHeader,
                    headerPayload: "Hardcover Books with Female Owners",
                  });
                  dispatch({
                    type: ActionKind.MaleAuthoredBooks,
                    booksPayload: GetAuthorListByGender(
                      "Male",
                      state.authorList as AuthorInfo[],
                      true
                    ),
                  });
                  dispatch({
                    type: ActionKind.FemaleAuthoredBooks,
                    booksPayload: GetAuthorListByGender(
                      "Female",
                      state.authorList as AuthorInfo[],
                      true
                    ),
                  });
                }}
              >
                Hardcover only
              </button>
              <button
                onClick={() => {
                  dispatch({
                    type: ActionKind.UpdateMaleHeader,
                    headerPayload: "Books with Male Owners",
                  });
                  dispatch({
                    type: ActionKind.UpdateFemaleHeader,
                    headerPayload: "Books with Female Owners",
                  });
                  dispatch({
                    type: ActionKind.MaleAuthoredBooks,
                    booksPayload: GetAuthorListByGender(
                      "Male",
                      state.authorList as AuthorInfo[]
                    ),
                  });
                  dispatch({
                    type: ActionKind.FemaleAuthoredBooks,
                    booksPayload: GetAuthorListByGender(
                      "Female",
                      state.authorList as AuthorInfo[]
                    ),
                  });
                }}
              >
                Get Books
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default App;
