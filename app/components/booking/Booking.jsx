"use client";

import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import Rating from "react-rating";

const Booking = ({ booking }) => {
  return (
    <div className="bg-white rounded shadow-sm p-5 overflow-x-auto mt-10">
      <table className="w-full text-nowrap">
        <thead>
          <tr>
            <th className="text-left border-b pb-5 px-5">Image</th>
            <th className="text-left border-b pb-5 px-5">Name</th>
            <th className="text-left border-b pb-5 px-5">Date</th>
            <th className="text-left border-b pb-5 px-5">Starting Time</th>
            <th className="text-left border-b pb-5 px-5">Session</th>
            <th className="text-left border-b pb-5 px-5">Earn</th>
            <th className="text-left border-b pb-5 px-5">Join Link</th>
            <th className="text-left border-b pb-5 px-5">Review</th>
          </tr>
        </thead>
        <tbody>
          {booking.map((book) => (
            <tr key={book._id}>
              <td className="text-left border-b py-5 px-5 align-top">
                <Image
                  src={book?.student.avatar?.url}
                  alt="Not found"
                  className="rounded size-16"
                  width={500}
                  height={500}
                />
              </td>
              <td className="text-left border-b py-5 px-5 align-top">
                {book?.student.name}
              </td>
              <td className="text-left border-b py-5 px-5 align-top">
                {moment(book.date).format("LL")}
              </td>
              <td className="text-left border-b py-5 px-5 align-top">
                {book.startedTime}
              </td>
              <td className="text-left border-b py-5 px-5 align-top">
                {book.session} hr
              </td>
              <td className="text-left border-b py-5 px-5 align-top">
                ${book?.tutorFee}
              </td>
              <td className="text-left border-b py-5 px-5 align-top">
                <Link
                  href={`${book?.tutorJoinLink}`}
                  target="blank"
                  className="hover:underline cursor-pointer"
                >
                  Click to join
                </Link>
              </td>
              <td className="text-left border-b py-5 px-5 align-top">
                {book.review ? (
                  <>
                    <Rating
                      initialRating={book.review}
                      emptySymbol="fa-regular fa-star"
                      readonly
                      fullSymbol="fa-solid fa-star"
                      fractions={2}
                      className="text-yellow-500 text-xl"
                    />
                    <p className="text-wrap">{book?.reviewText}</p>
                  </>
                ) : (
                  <p>Not reviewed yet</p>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Booking;
