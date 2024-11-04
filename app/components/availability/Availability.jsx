import { CircleMinus, CirclePlus, LockIcon } from "lucide-react";

const index = ({ avail, setIsOpen, availabilityDayHandler, deleteHandler }) => {
  console.log(avail);

  return (
    <div className="bg-white rounded shadow-sm p-5 overflow-x-auto">
      <table className="w-full text-nowrap">
        <thead>
          <tr>
            <th className="text-left border-b pb-5 px-5">Day</th>
            <th className="text-left border-b pb-5 px-5">Time</th>
            <th className="text-left border-b pb-5 px-5">Add More</th>
          </tr>
        </thead>
        <tbody>
          {avail.map((el, index) => (
            <tr key={index}>
              <td className="text-left py-5 px-5 align-top">{el.day}</td>
              <td className="text-left py-5 px-5 align-top">
                <div className="space-y-3">
                  {el.time.map((t, index) => (
                    <div className="flex items-center gap-5" key={index}>
                      <div className="flex items-center gap-2">
                        <p>{t.startedTime}</p>
                        <p>-</p>
                        <p>{t.endedTime}</p>
                      </div>
                      {new Date(t.createdAt) <
                      new Date(Date.now() - 24 * 60 * 60 * 1000) ? (
                        <CircleMinus
                          className="cursor-pointer hover:text-primary size-6"
                          onClick={() => deleteHandler(t._id)}
                        />
                      ) : (
                        <div title="You can't modify within 24 hours">
                          <LockIcon className="size-6" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </td>
              <td className="text-left py-5 px-5 align-top">
                <div
                  className="flex items-center gap-5"
                  onClick={() => {
                    availabilityDayHandler(el.day);
                    setIsOpen(true);
                  }}
                >
                  <CirclePlus className="cursor-pointer hover:text-primary" />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default index;
