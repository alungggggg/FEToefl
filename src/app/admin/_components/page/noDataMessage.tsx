import { AlertCircle } from "lucide-react";

const NoDataMessage = () => {
  return (
    <section className="flex gap-2 items-center border p-4 rounded-lg bg-red-50 text-red-500 border-red-500 shadow-sm">
      <AlertCircle />
      <div>
        <p>No Data</p>
        <p>
          There is no data available, please add some data by clicking the
          button above
        </p>
      </div>
    </section>
  );
};

export default NoDataMessage;
