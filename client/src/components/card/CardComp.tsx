import { Rate } from "antd";
import { Link } from "react-router-dom";
import { BookInfo } from "../../types/types";
import { calculateForBook } from "../../helper/helper";
import { Card } from "antd";
import Meta from "antd/es/card/Meta";
interface CardProps {
  book: BookInfo;
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
        <Card
          hoverable
          bordered={false}
          cover={
            <div className="aspect-square">
              <img
                className="w-full h-full object-cover"
                alt={book.title}
                src={book.avatar}
              />
            </div>
          }
        >
          <Meta title={book.title} description={`Tác giả: ${book.author}`} />

          <div className="mt-4 flex flex-wrap justify-between gap-4">
            <Rate allowHalf defaultValue={average} disabled />
            <p>{totalComments} đánh giá</p>
          </div>
          <p className="mt-4">{book.type.name}</p>
        </Card>
      </Link>
    </>
  );
};
export default CardComp;
