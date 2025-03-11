import { ReactNode } from "react";

type props = {
  children: ReactNode;
  isShow: boolean
};

const Modal = (myProps: props) => {
  return (
    <div className={`z-[1024] w-dvw h-dvh fixed top-0 left-0 bg-black bg-opacity-75 flex justify-center items-center ${myProps.isShow ? `block`:`hidden`}`}>
        {/* z adalah sumbu z, jadi dia maju sebanyak 1024 layer didepan */}
      <div className="w-5/6 md:w-4/5 lg:w-3/6 bg-white">{myProps.children}</div>
    </div>
  );
};

export default Modal;