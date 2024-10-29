import moment from "moment";

const Items = ({ allwithdraws }) => {
  return (
    <div className="bg-white rounded shadow-sm p-5 overflow-x-auto">
      <table className="w-full text-nowrap">
        <thead>
          <tr>
            <th className="text-left border-b pb-5 px-5">Date</th>
            <th className="text-left border-b pb-5 px-5">Amount</th>
          </tr>
        </thead>
        <tbody>
          {[...allwithdraws].reverse().map((item, index) => (
            <tr key={index}>
              <td className="text-left border-b py-5 px-5">
                {moment(item.createdAt).format("LL")}
              </td>
              <td className="text-left border-b py-5 px-5">${item.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Items;
