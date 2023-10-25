import Express from "express";
import cors from "cors";

const app = Express();

app.use(cors());

app.get("/authors", (req, res) => {
  res.send(list);
});

app.listen("8764", () => {
  console.log("Server is listening on port 8764.");
});

const list = {
  List: [
    {
      name: "Charles",
      gender: "Male",
      age: 23,
      books: [
        { name: "Hamlet", type: "Hardcover" },
        { name: "Wuthering Heights", type: "Paperback" },
      ],
    },
    {
      name: "Emily",
      gender: "Female",
      age: 18,
      books: [{ name: "Hamlet", type: "Paperback" }],
    },
    { name: "Jonathan", gender: "Male", age: 45, books: null },
    {
      name: "William",
      gender: "Male",
      age: 40,
      books: [
        { name: "React: The Ultimate Guide", type: "Hardcover" },
        { name: "Gulliver's Travels", type: "Hardcover" },
        { name: "Jane Eyre", type: "Paperback" },
        { name: "Great Expectations", type: "Hardcover" },
      ],
    },
    {
      name: "Charlotte",
      gender: "Female",
      age: 40,
      books: [{ name: "Great Expectations", type: "Hardcover" }],
    },
    {
      name: "Jane",
      gender: "Female",
      age: 64,
      books: [
        { name: "Little Red Riding Hood", type: "Hardcover" },
        { name: "The Hobbit", type: "Ebook" },
      ],
    },
  ],
};
