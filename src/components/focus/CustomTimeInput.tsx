
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface CustomTimeInputProps {
  customMinutes: number;
  onChange: (minutes: number) => void;
  onSubmit: () => void;
}

const CustomTimeInput = ({ customMinutes, onChange, onSubmit }: CustomTimeInputProps) => {
  return (
    <div className="flex justify-center items-center gap-3 mb-4">
      <Label htmlFor="custom-time" className="text-sm font-medium">
        Minutes:
      </Label>
      <Input
        id="custom-time"
        type="number"
        min="1"
        max="180"
        value={customMinutes}
        onChange={(e) => onChange(parseInt(e.target.value) || 1)}
        className="w-20 text-center"
      />
      <Button
        onClick={onSubmit}
        size="sm"
        className="bg-sky-500 hover:bg-sky-600 text-white"
      >
        Set
      </Button>
    </div>
  );
};

export default CustomTimeInput;
