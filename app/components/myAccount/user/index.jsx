import Button1 from "@/app/components/common/button/Button";
import Input from "@/app/components/common/input/Input";
import UploadImage from "@/app/components/common/upload";
import StudentImage from "@/public/images/tutor.jpg";
import Image from "next/image";

const index = () => {
  return (
    <div className="bg-white rounded shadow-sm p-5">
      <p className="text-2xl">Account</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 items-end mt-10">
        <div className="space-y-5">
          <div className="flex items-center gap-5 text-nowrap">
            <Image
              src={StudentImage}
              alt=""
              className="w-20 lg:size-40 rounded-full"
            />
            <div>
              <p className="text-2xl">MH Shuvo</p>
              <p className="text-gray-500">Max file size is 2 MB</p>
            </div>
          </div>
          <UploadImage />
        </div>
        <div className="space-y-5">
          <p className="text-xl">User Password</p>
          <Input placeholder="Current password" />
          <Input placeholder="New password" />
          <Input placeholder="Confirm password" />
          <Button1 title={"Change"} />
        </div>
      </div>
    </div>
  );
};

export default index;
