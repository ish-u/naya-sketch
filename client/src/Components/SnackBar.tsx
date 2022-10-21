import { useEffect, useState } from "react";
const SnackBar = ({
  message,
  setShowMessage,
}: {
  message: string;
  setShowMessage: (value: boolean) => void;
}) => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    setShow(true);
    const timeout = setTimeout(() => {
      setShow(false);
      setShowMessage(false);
    }, 3000);
    return () => {
      clearTimeout(timeout);
    };
  }, []);
  return (
    <>
      {show && (
        <div
          className="fixed bottom-4 left-4 px-4 py-2 border-2 md font-semibold text-lg duration-300
                 flex justify-center items-center bg-[#4F00C1]/75 text-white transition-opacity"
        >
          {message}
        </div>
      )}
    </>
  );
};

export default SnackBar;
