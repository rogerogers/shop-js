import Settings from '@/config';
import Image from 'next/image';

const Loading = () => {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-white dark:bg-black z-50 ">
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin">
          <Image src={Settings.logo} alt="logo" width={40} height={40} />
        </div>
      </div>
    </div>
  );
};

export default Loading;
