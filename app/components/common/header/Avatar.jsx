import Image from "next/image";

const UserAvatar = ({ data }) => {
  return (
    <>
      {data?.avatar ? (
        <Image
          src={data?.avatar?.url}
          className={`rounded-full bg-slate-100 border-primary border size-7 lg:size-9`}
          alt="Avatar"
          width={300}
          height={300}
        />
      ) : (
        <p
          className={`rounded-full bg-primary border text-white flex items-center justify-center size-7 lg:size-9 `}
        >
          {data?.name.slice(0, 1)}
        </p>
      )}
    </>
  );
};

export default UserAvatar;
