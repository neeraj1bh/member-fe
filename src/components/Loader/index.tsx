import { FC } from "react";

interface Props {
  isLoading: boolean;
  className?: string;
}

const Loader: FC<Props> = ({ isLoading, className }) => {
  if (!isLoading) return null;

  return (
    <div
      className={`flex h-full w-full items-center justify-center ${className}`}
    >
      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900"></div>
    </div>
  );
};

export default Loader;
