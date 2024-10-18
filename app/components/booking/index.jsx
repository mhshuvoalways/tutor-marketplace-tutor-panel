const index = () => {
  return (
    <div className="grid grid-cols-2 gap-10">
      <div className="bg-white rounded py-10 px-5 text-center shadow-sm">
        <p className="opacity-80">Total Booking</p>
        <p className="text-2xl mt-5">19</p>
      </div>
      <div className="bg-white rounded py-10 px-5 text-center shadow-sm">
        <p className="opacity-80">Running Booking</p>
        <p className="text-2xl mt-5">02</p>
      </div>
    </div>
  );
};

export default index;
