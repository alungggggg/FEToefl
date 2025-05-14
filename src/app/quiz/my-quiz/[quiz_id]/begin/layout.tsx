import React from "react";

const Layout = ({
  children,
  camera,
  quiz_list,
}: {
  children: React.ReactNode;
  camera: React.ReactNode;
  quiz_list: React.ReactNode;
}) => {
  return (
    <section>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-2">
          <div className="bg-white/70 backdrop-blur-sm p-4 rounded-lg shadow-md flex flex-col gap-y-4 justify-start">
            <div className="col-span-8 bg-white/70 backdrop-blur-sm p-4 rounded-lg shadow-md h-fit">
              <p className="text-lg font-bold text-center">00:00:00</p>
            </div>
            <div>{camera}</div>
          </div>
        </div>
        <div className="col-span-8 ">
          <div className="bg-white/70 backdrop-blur-sm p-4 rounded-lg shadow-md">
            {children}
          </div>
        </div>
        <div className="col-span-2">{quiz_list}</div>
      </div>
    </section>
  );
};

export default Layout;
