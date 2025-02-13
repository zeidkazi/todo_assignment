import { Edit, Trash } from "lucide-react";

const LoaderSkeleton = () => {
  return (
    <div className="bg-primary border border-primary flex flex-col w-full max-w-max rounded-t-lg shadow animate-pulse">
      <div className="p-sm flex flex-col gap-sm">
        <p className=" text-large md:text-xlarge font-bold bg-background w-20 h-6 animate-pulse"></p>
        <div className="w-full flex gap-base">
          <p className=" text-large md:text-xlarge font-bold bg-background w-20 h-4 animate-pulse"></p>
          <p className=" text-large md:text-xlarge font-bold bg-background w-20 h-4 animate-pulse"></p>
        </div>
        <div className="w-full flex gap-base">
          <p className=" text-large md:text-xlarge font-bold bg-background w-20 h-4 animate-pulse"></p>
          <p className=" text-large md:text-xlarge font-bold bg-background w-20 h-4 animate-pulse"></p>
        </div>
      </div>
      <div className="bg-white p-xs flex items-center justify-end gap-base">
        <button className="">
          <Edit strokeWidth={1.5} />
        </button>
        <button className="cursor-pointer hover:scale-[1.1] transition">
          <Trash strokeWidth={1.5} />
        </button>
      </div>
    </div>
  );
};

export default LoaderSkeleton;
