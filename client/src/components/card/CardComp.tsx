import { Rating } from "@mui/material";
import { Link } from "react-router-dom";
import { Book } from "../../types/types";
import { calculateForBook } from "../../helper/helper";
interface CardProps {
  book: Book;
}

const CardComp: React.FC<CardProps> = ({ book }) => {
  let totalComments = 0,
    average = 0;
  if (book.comments) {
    totalComments = calculateForBook(book.comments).totalComments;
    average = calculateForBook(book.comments).average;
  }

  return (
    <>
      <Link to={`/detail/${book.id}`}>
        <div className=" p-4 bg-white hover:shadow-lg ">
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
              className="mb-2 text-xl font-bold tracking-tight text-gray-900  truncate"
              title={book.title}
            >
              {book.title}
            </h5>
            <p className="flex items-center justify-between flex-wrap">
              <Rating name="half-rating-read" value={average} readOnly />{" "}
              <span>({totalComments} đánh giá)</span>
            </p>
          </div>
        </div>
      </Link>
    </>
  );
};
export default CardComp;
