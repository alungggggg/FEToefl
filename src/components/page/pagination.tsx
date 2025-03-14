import { ChevronsLeft, ChevronsRight } from "lucide-react";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";

type PaginationInterface = {
  dataLength: number;
  showedDataNumber: number;
  setShowedDataIndex: React.Dispatch<{ start: number; end: number }>;
};

const Pagination = ({
  dataLength,
  showedDataNumber,
  setShowedDataIndex,
}: PaginationInterface) => {
  const [currentItem, setcurrentItem] = useState(1);
  const [paginationLength, setPaginationLength] = useState(0);

  useEffect(() => {
    var countPaginationLength;
    if (dataLength % showedDataNumber == 0) {
        countPaginationLength = dataLength / showedDataNumber;
    } else {
      countPaginationLength = Math.floor(dataLength / showedDataNumber) + 1;
    }
    setPaginationLength(countPaginationLength);
  }, [dataLength]);

  function handlePrevButton() {
    if (currentItem > 1) {
      setcurrentItem(currentItem - 1);
    } else {
      return null;
    }
  }
  function handleNextButton() {
    if (currentItem < paginationLength) {
      setcurrentItem(currentItem + 1);
    } else {
      return null;
    }
  }

  function handleSetShowedItem() {
    const showedItem = {
      start: (currentItem - 1) * showedDataNumber,
      end: currentItem * showedDataNumber - 1,
    };

    setShowedDataIndex(showedItem);
  }
  useEffect(() => {
    handleSetShowedItem();
  }, [currentItem]);

  return (
    <section className="flex gap-2 items-center">
      <Button
        className="bg-[#3674B5]"
        onClick={handlePrevButton}
        disabled={currentItem == 1}
      >
        <ChevronsLeft />
        Prev
      </Button>
      <Button className="border rounded-md min-w-[100px]" disabled>
        {currentItem} / {paginationLength}
      </Button>
      <Button
        className="bg-[#3674B5]"
        disabled={currentItem == paginationLength}
        onClick={handleNextButton}
      >
        Next
        <ChevronsRight />
      </Button>
    </section>
  );
};

export default Pagination;
