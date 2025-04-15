import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { QuestionInterface } from "@/lib/interface";

const ViewReadingQuestion = ({
  selectedQuestion,
  setIsOpen,
}: {
  selectedQuestion: QuestionInterface | undefined;
  setIsOpen: (isOpen: boolean) => void;
}) => {
  return (
    <>
      <div>
        <p className="text-justify">{selectedQuestion?.question || ""}</p>
        <div className="grid grid-cols-2 gap-y-2 mt-6">
          {selectedQuestion?.options.map((item) => (
            <div key={item.uuid} className="flex gap-x-2">
              <input
                type="radio"
                name="option"
                id={item.uuid}
                value={item.options}
                disabled
              />
              <label htmlFor={item.uuid} className="text-sm">
                {item.options}
              </label>
            </div>
          ))}
        </div>
      </div>
      <DialogFooter>
        <Button onClick={() => setIsOpen(false)}>Close</Button>
      </DialogFooter>
    </>
  );
};

export default ViewReadingQuestion;
