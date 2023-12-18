import { Rating } from "@mui/material";
import { Link } from "react-router-dom";
import { Book } from "../../types/types";
interface CardProps {
  book: Book;
}

const CardComp: React.FC<CardProps> = ({ book }) => {
  const sum = book.comments.reduce((a, b) => a + b.score, 0);
  const commentTotal = book.comments.length;
  const average = sum / commentTotal;
  return (
    <>
      <Link to={`/detail/${book.id}`}>
        <div className=" p-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <div>
            <img
              className="rounded-t-lg"
              src={
                book.avatar ||
                "https://cdn0.fahasa.com/media/catalog/product/8/9/8935210289285.jpg"
              }
              alt={book.title}
            />
          </div>
          <div className="mt-4">
            <h5
              className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white truncate"
              title={book.title}
            >
              {book.title}
            </h5>
            <p className="flex items-center justify-between flex-wrap">
              <Rating
                name="half-rating-read"
                value={average || 0}
                precision={0.5}
                readOnly
              />{" "}
              <span>({commentTotal} đánh giá)</span>
            </p>
          </div>
        </div>
      </Link>
    </>
  );
};
export default CardComp;
