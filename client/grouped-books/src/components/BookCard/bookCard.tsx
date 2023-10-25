import "./BookCard.css";

export type BookCardProps = {
  cardHeader?: string;
  authorList?: string[];
};

export default function BookCard({ cardHeader, authorList }: BookCardProps) {
  let authorKey = 0;

  function GenerateKey() {
    return authorKey++;
  }

  return (
    <div className="book-card-container">
      <div className="card-header">
        <p>{cardHeader}</p>
      </div>
      <div className="card-body">
        {authorList?.map(author => <p key={GenerateKey()}>{author}</p>)}
      </div>
    </div>
  );
}
