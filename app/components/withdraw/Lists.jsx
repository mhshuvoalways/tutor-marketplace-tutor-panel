const Items = ({ tutors }) => {
  return (
    <div className="bg-white rounded shadow-sm p-5 overflow-x-auto">
      <table className="w-full text-nowrap">
        <thead>
          <tr>
            <th className="text-left border-b pb-5 px-5">Date</th>
            <th className="text-left border-b pb-5 px-5">Amount</th>
            <th className="text-left border-b pb-5 px-5">status</th>
          </tr>
        </thead>
        <tbody>
          {tutors.map((tutor, index) => (
            <tr key={index}>
              <td className="text-left border-b py-5 px-5">{tutor.date}</td>
              <td className="text-left border-b py-5 px-5">
                ${tutor.withdrawMoney}
              </td>
              <td className="text-left border-b py-5 px-5">
                {tutor.isPaid ? (
                  <p className="text-green-400">Completed</p>
                ) : (
                  <p className="text-red-400">Pending</p>
                )}
                <p></p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Items;
