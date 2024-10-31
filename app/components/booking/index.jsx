import { authConfig } from "@/app/auth.config";
import NextAuth from "next-auth";

const Index = async () => {
  const { auth } = NextAuth(authConfig);
  const mySession = await auth();
  const email = mySession.user.email;

  let booking = [];
  let totalEarning = 0;

  if (!booking.length) {
    const response = await fetch(
      `${process.env.BASE_URL}/api/booking/${email}`,
      {
        cache: "no-store",
      }
    );
    if (response.status === 200) {
      const result = (await response.json()) || [];
      booking = result;
      result.forEach((element) => {
        totalEarning += element.tutorFee;
      });
    }
  }

  return (
    <div className="grid grid-cols-2 gap-10">
      <div className="bg-white rounded py-10 px-5 text-center shadow-sm">
        <p className="opacity-80">Total Booking</p>
        <p className="text-2xl mt-5">{booking.length}</p>
      </div>
      <div className="bg-white rounded py-10 px-5 text-center shadow-sm">
        <p className="opacity-80">Total Earning</p>
        <p className="text-2xl mt-5">{totalEarning}</p>
      </div>
    </div>
  );
};

export default Index;
