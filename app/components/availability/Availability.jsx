import { CircleMinus, CirclePlus } from "lucide-react";

const index = ({ setIsOpen }) => {
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
          <tr>
            <td className="text-left py-5 px-5 align-top">Saturday</td>
            <td className="text-left py-5 px-5 align-top">
              <div className="space-y-3">
                <div className="flex items-centerg gap-5">
                  <div className="flex items-centerg gap-2 w-28">
                    <p>9:00</p>
                    <p>-</p>
                    <p>11:00</p>
                  </div>
                  <CircleMinus className="cursor-pointer hover:text-primary" />
                </div>
                <div className="flex items-centerg gap-5">
                  <div className="flex items-centerg gap-2 w-28">
                    <p>4:00</p>
                    <p>-</p>
                    <p>5:00</p>
                  </div>
                  <CircleMinus className="cursor-pointer hover:text-primary" />
                </div>
                <div className="flex items-centerg gap-5">
                  <div className="flex items-centerg gap-2 w-28">
                    <p>9:00</p>
                    <p>-</p>
                    <p>10:00</p>
                  </div>
                  <CircleMinus className="cursor-pointer hover:text-primary" />
                </div>
              </div>
            </td>
            <td className="text-left py-5 px-5 align-top">
              <div
                className="flex items-center gap-5"
                onClick={() => setIsOpen(true)}
              >
                <CirclePlus className="cursor-pointer hover:text-primary" />
              </div>
            </td>
          </tr>
          <tr>
            <td className="text-left py-5 px-5 align-top">Sunday</td>
            <td className="text-left py-5 px-5 align-top">
              <div className="space-y-3">
                <div className="flex items-centerg gap-5">
                  <div className="flex items-centerg gap-2 w-28">
                    <p>9:00</p>
                    <p>-</p>
                    <p>11:00</p>
                  </div>
                  <CircleMinus className="cursor-pointer hover:text-primary" />
                </div>
                <div className="flex items-centerg gap-5">
                  <div className="flex items-centerg gap-2 w-28">
                    <p>4:00</p>
                    <p>-</p>
                    <p>5:00</p>
                  </div>
                  <CircleMinus className="cursor-pointer hover:text-primary" />
                </div>
                <div className="flex items-centerg gap-5">
                  <div className="flex items-centerg gap-2 w-28">
                    <p>9:00</p>
                    <p>-</p>
                    <p>10:00</p>
                  </div>
                  <CircleMinus className="cursor-pointer hover:text-primary" />
                </div>
              </div>
            </td>
            <td className="text-left py-5 px-5 align-top">
              <div
                className="flex items-center gap-5"
                onClick={() => setIsOpen(true)}
              >
                <CirclePlus className="cursor-pointer hover:text-primary" />
              </div>
            </td>
          </tr>
          <tr>
            <td className="text-left py-5 px-5 align-top">Monday</td>
            <td className="text-left py-5 px-5 align-top">
              <div className="space-y-3">
                <div className="flex items-centerg gap-5">
                  <div className="flex items-centerg gap-2 w-28">
                    <p>9:00</p>
                    <p>-</p>
                    <p>11:00</p>
                  </div>
                  <CircleMinus className="cursor-pointer hover:text-primary" />
                </div>
                <div className="flex items-centerg gap-5">
                  <div className="flex items-centerg gap-2 w-28">
                    <p>4:00</p>
                    <p>-</p>
                    <p>5:00</p>
                  </div>
                  <CircleMinus className="cursor-pointer hover:text-primary" />
                </div>
                <div className="flex items-centerg gap-5">
                  <div className="flex items-centerg gap-2 w-28">
                    <p>9:00</p>
                    <p>-</p>
                    <p>10:00</p>
                  </div>
                  <CircleMinus className="cursor-pointer hover:text-primary" />
                </div>
              </div>
            </td>
            <td className="text-left py-5 px-5 align-top">
              <div
                className="flex items-center gap-5"
                onClick={() => setIsOpen(true)}
              >
                <CirclePlus className="cursor-pointer hover:text-primary" />
              </div>
            </td>
          </tr>
          <tr>
            <td className="text-left py-5 px-5 align-top">Tuesday</td>
            <td className="text-left py-5 px-5 align-top">
              <div className="space-y-3">
                <div className="flex items-centerg gap-5">
                  <div className="flex items-centerg gap-2 w-28">
                    <p>9:00</p>
                    <p>-</p>
                    <p>11:00</p>
                  </div>
                  <CircleMinus className="cursor-pointer hover:text-primary" />
                </div>
                <div className="flex items-centerg gap-5">
                  <div className="flex items-centerg gap-2 w-28">
                    <p>4:00</p>
                    <p>-</p>
                    <p>5:00</p>
                  </div>
                  <CircleMinus className="cursor-pointer hover:text-primary" />
                </div>
                <div className="flex items-centerg gap-5">
                  <div className="flex items-centerg gap-2 w-28">
                    <p>9:00</p>
                    <p>-</p>
                    <p>10:00</p>
                  </div>
                  <CircleMinus className="cursor-pointer hover:text-primary" />
                </div>
              </div>
            </td>
            <td className="text-left py-5 px-5 align-top">
              <div
                className="flex items-center gap-5"
                onClick={() => setIsOpen(true)}
              >
                <CirclePlus className="cursor-pointer hover:text-primary" />
              </div>
            </td>
          </tr>
          <tr>
            <td className="text-left py-5 px-5 align-top">Wedneyday</td>
            <td className="text-left py-5 px-5 align-top">
              <div className="space-y-3">
                <div className="flex items-centerg gap-5">
                  <div className="flex items-centerg gap-2 w-28">
                    <p>9:00</p>
                    <p>-</p>
                    <p>11:00</p>
                  </div>
                  <CircleMinus className="cursor-pointer hover:text-primary" />
                </div>
                <div className="flex items-centerg gap-5">
                  <div className="flex items-centerg gap-2 w-28">
                    <p>4:00</p>
                    <p>-</p>
                    <p>5:00</p>
                  </div>
                  <CircleMinus className="cursor-pointer hover:text-primary" />
                </div>
                <div className="flex items-centerg gap-5">
                  <div className="flex items-centerg gap-2 w-28">
                    <p>9:00</p>
                    <p>-</p>
                    <p>10:00</p>
                  </div>
                  <CircleMinus className="cursor-pointer hover:text-primary" />
                </div>
              </div>
            </td>
            <td className="text-left py-5 px-5 align-top">
              <div
                className="flex items-center gap-5"
                onClick={() => setIsOpen(true)}
              >
                <CirclePlus className="cursor-pointer hover:text-primary" />
              </div>
            </td>
          </tr>
          <tr>
            <td className="text-left py-5 px-5 align-top">Thursday</td>
            <td className="text-left py-5 px-5 align-top">
              <div className="space-y-3">
                <div className="flex items-centerg gap-5">
                  <div className="flex items-centerg gap-2 w-28">
                    <p>9:00</p>
                    <p>-</p>
                    <p>11:00</p>
                  </div>
                  <CircleMinus className="cursor-pointer hover:text-primary" />
                </div>
                <div className="flex items-centerg gap-5">
                  <div className="flex items-centerg gap-2 w-28">
                    <p>4:00</p>
                    <p>-</p>
                    <p>5:00</p>
                  </div>
                  <CircleMinus className="cursor-pointer hover:text-primary" />
                </div>
                <div className="flex items-centerg gap-5">
                  <div className="flex items-centerg gap-2 w-28">
                    <p>9:00</p>
                    <p>-</p>
                    <p>10:00</p>
                  </div>
                  <CircleMinus className="cursor-pointer hover:text-primary" />
                </div>
              </div>
            </td>
            <td className="text-left py-5 px-5 align-top">
              <div
                className="flex items-center gap-5"
                onClick={() => setIsOpen(true)}
              >
                <CirclePlus className="cursor-pointer hover:text-primary" />
              </div>
            </td>
          </tr>
          <tr>
            <td className="text-left py-5 px-5 align-top">Friday</td>
            <td className="text-left py-5 px-5 align-top">
              <div className="space-y-3">
                <div className="flex items-centerg gap-5">
                  <div className="flex items-centerg gap-2 w-28">
                    <p>9:00</p>
                    <p>-</p>
                    <p>11:00</p>
                  </div>
                  <CircleMinus className="cursor-pointer hover:text-primary" />
                </div>
                <div className="flex items-centerg gap-5">
                  <div className="flex items-centerg gap-2 w-28">
                    <p>4:00</p>
                    <p>-</p>
                    <p>5:00</p>
                  </div>
                  <CircleMinus className="cursor-pointer hover:text-primary" />
                </div>
                <div className="flex items-centerg gap-5">
                  <div className="flex items-centerg gap-2 w-28">
                    <p>9:00</p>
                    <p>-</p>
                    <p>10:00</p>
                  </div>
                  <CircleMinus className="cursor-pointer hover:text-primary" />
                </div>
              </div>
            </td>
            <td className="text-left py-5 px-5 align-top">
              <div
                className="flex items-center gap-5"
                onClick={() => setIsOpen(true)}
              >
                <CirclePlus className="cursor-pointer hover:text-primary" />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default index;
