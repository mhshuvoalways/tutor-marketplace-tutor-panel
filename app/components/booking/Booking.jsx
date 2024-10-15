"use client";

import StudentImage from "@/public/images/tutor.jpg";
import Image from "next/image";
import Link from "next/link";
import Rating from "react-rating";

const Booking = () => {
  return (
    <div className="bg-white rounded shadow-sm p-5 overflow-x-auto mt-10">
      <table className="w-full text-nowrap">
        <thead>
          <tr>
            <th className="text-left border-b pb-5 px-5">Image</th>
            <th className="text-left border-b pb-5 px-5">Name</th>
            <th className="text-left border-b pb-5 px-5">Date</th>
            <th className="text-left border-b pb-5 px-5">Time</th>
            <th className="text-left border-b pb-5 px-5">Season</th>
            <th className="text-left border-b pb-5 px-5">Join Link</th>
            <th className="text-left border-b pb-5 px-5">Reviewed</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="text-left border-b py-5 px-5">
              <Image src={StudentImage} alt="" className="rounded size-16" />
            </td>
            <td className="text-left border-b py-5 px-5">Malcolm Lockyer</td>
            <td className="text-left border-b py-5 px-5">10-10-2024</td>
            <td className="text-left border-b py-5 px-5">10:30AM</td>
            <td className="text-left border-b py-5 px-5">2 hr</td>
            <td className="text-left border-b py-5 px-5">
              <Link
                href={"https://www.mhshuvo.com/"}
                target="blank"
                className="hover:underline cursor-pointer"
              >
                Click to join
              </Link>
            </td>
            <td className="text-left border-b py-5 px-5">
              <Rating
                initialRating={5}
                emptySymbol="fa-regular fa-star"
                readonly
                fullSymbol="fa-solid fa-star"
                fractions={2}
                className="text-yellow-500 text-xl"
              />
            </td>
          </tr>
          <tr>
            <td className="text-left border-b py-5 px-5">
              <Image src={StudentImage} alt="" className="rounded size-16" />
            </td>
            <td className="text-left border-b py-5 px-5">Malcolm Lockyer</td>
            <td className="text-left border-b py-5 px-5">10-10-2024</td>
            <td className="text-left border-b py-5 px-5">10:30AM</td>
            <td className="text-left border-b py-5 px-5">2 hr</td>
            <td className="text-left border-b py-5 px-5">
              <Link
                href={"https://www.mhshuvo.com/"}
                target="blank"
                className="hover:underline cursor-pointer"
              >
                Click to join
              </Link>
            </td>
            <td className="text-left border-b py-5 px-5">Not yet</td>
          </tr>
          <tr>
            <td className="text-left pt-5 px-5">
              <Image src={StudentImage} alt="" className="rounded size-16" />
            </td>
            <td className="text-left pt-5 px-5">Malcolm Lockyer</td>
            <td className="text-left pt-5 px-5">10-10-2024</td>
            <td className="text-left pt-5 px-5">10:30AM</td>
            <td className="text-left pt-5 px-5">2 hr</td>
            <td className="text-left pt-5 px-5">
              <Link
                href={"https://www.mhshuvo.com/"}
                target="blank"
                className="hover:underline cursor-pointer"
              >
                Click to join
              </Link>
            </td>
            <td className="text-left pt-5 px-5">
              <Rating
                initialRating={5}
                emptySymbol="fa-regular fa-star"
                readonly
                fullSymbol="fa-solid fa-star"
                fractions={2}
                className="text-yellow-500 text-xl"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Booking;
