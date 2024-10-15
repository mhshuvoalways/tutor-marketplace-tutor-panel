import Image from "next/image";

const UserAvatar = ({ avatarUrl }) => {
  return (
    <>
      {avatarUrl ? (
        <Image
          src={avatarUrl}
          className={`rounded-full bg-slate-100 border-primary border size-7 lg:size-9`}
          alt="Avatar"
          width={300}
          height={300}
        />
      ) : (
        <p
          className={`rounded-full bg-primary border text-white flex items-center justify-center size-7 lg:size-9 `}
        >
          M
        </p>
      )}
    </>
  );
};

export default UserAvatar;
