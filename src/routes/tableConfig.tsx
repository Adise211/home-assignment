import { createFileRoute } from "@tanstack/react-router";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { setRows } from "@/stores/tableConfigSlice";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/stores/store";

export const Route = createFileRoute("/tableConfig")({
  component: RouteComponent,
});

function RouteComponent() {
  const rows = useSelector((state: RootState) => state.tableConfig.rows);
  const dispatch = useDispatch();

  const handleSliderChange = (newValue: number[]) => {
    dispatch(setRows(newValue[0]));
  };

  const handleNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(event.target.value);
    if (!isNaN(newValue) && newValue >= 1 && newValue <= 10) {
      dispatch(setRows(newValue));
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Table Configuration</h1>
        <p className="text-muted-foreground">
          Configure your table settings using the controls below.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Slider Input Card */}
        <Card>
          <CardHeader>
            <CardTitle>Slider Input</CardTitle>
            <CardDescription>
              Use the slider to select a value between 1 and 10
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="slider">Value: {rows}</Label>
              <Slider
                id="slider"
                min={1}
                max={10}
                step={1}
                value={[rows]}
                onValueChange={handleSliderChange}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>1</span>
                <span>10</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Number Input Card */}
        <Card>
          <CardHeader>
            <CardTitle>Number Input</CardTitle>
            <CardDescription>
              Enter a number directly between 1 and 10
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="number-input">Value</Label>
              <Input
                id="number-input"
                type="number"
                min={1}
                max={10}
                value={rows}
                onChange={handleNumberChange}
                className="w-full"
                placeholder="Enter 1-10"
              />
              <p className="text-xs text-muted-foreground">
                Enter a value between 1 and 10
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Synchronized Values Display */}
      <Card>
        <CardHeader>
          <CardTitle>Current Values</CardTitle>
          <CardDescription>
            Both inputs are synchronized and show the same value
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="font-medium">Current Value:</span>
              <span className="text-lg font-bold text-primary">{rows}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                Both inputs are synchronized
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
