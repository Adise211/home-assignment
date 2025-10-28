import { createFileRoute } from "@tanstack/react-router";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/stores/store";
import {
  toggleTableConfigPage,
  toggleTableConfigSlider,
} from "@/stores/featureFlagsSlice";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Settings, ToggleLeft, ToggleRight } from "lucide-react";

export const Route = createFileRoute("/adminPanel")({
  component: RouteComponent,
});

function RouteComponent() {
  const dispatch = useDispatch();
  const { isTableConfigPageEnabled, isTableConfigSliderEnabled } = useSelector(
    (state: RootState) => state.featureFlags
  );

  const handleTogglePage = () => {
    dispatch(toggleTableConfigPage());
  };

  const handleToggleSlider = () => {
    dispatch(toggleTableConfigSlider());
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Settings className="h-8 w-8" />
          Admin Panel
        </h1>
        <p className="text-muted-foreground">
          Manage feature flags and application settings
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Table Config Page Toggle */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {isTableConfigPageEnabled ? (
                <ToggleRight className="h-5 w-5 text-green-600" />
              ) : (
                <ToggleLeft className="h-5 w-5 text-gray-400" />
              )}
              Table Config Page
            </CardTitle>
            <CardDescription>
              Control the visibility of the entire Table Config page
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="page-toggle" className="text-base">
                  Enable Table Config Page
                </Label>
                <p className="text-sm text-muted-foreground">
                  When disabled, the Table Config page will be hidden from the
                  sidebar
                </p>
              </div>
              <Switch
                id="page-toggle"
                checked={isTableConfigPageEnabled}
                onCheckedChange={handleTogglePage}
              />
            </div>
            <div className="flex items-center gap-2">
              <Badge
                variant={isTableConfigPageEnabled ? "default" : "secondary"}
                className={
                  isTableConfigPageEnabled
                    ? "bg-green-100 text-green-800 hover:bg-green-100"
                    : "bg-gray-100 text-gray-800 hover:bg-gray-100"
                }
              >
                {isTableConfigPageEnabled ? "Enabled" : "Disabled"}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Table Config Slider Toggle */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {isTableConfigSliderEnabled ? (
                <ToggleRight className="h-5 w-5 text-green-600" />
              ) : (
                <ToggleLeft className="h-5 w-5 text-gray-400" />
              )}
              Table Config Slider
            </CardTitle>
            <CardDescription>
              Control the visibility of the slider input on the Table Config
              page
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="slider-toggle" className="text-base">
                  Enable Slider Input
                </Label>
                <p className="text-sm text-muted-foreground">
                  When disabled, only the number input will be available
                </p>
              </div>
              <Switch
                id="slider-toggle"
                checked={isTableConfigSliderEnabled}
                onCheckedChange={handleToggleSlider}
                disabled={!isTableConfigPageEnabled}
              />
            </div>
            <div className="flex items-center gap-2">
              <Badge
                variant={isTableConfigSliderEnabled ? "default" : "secondary"}
                className={
                  isTableConfigSliderEnabled
                    ? "bg-green-100 text-green-800 hover:bg-green-100"
                    : "bg-gray-100 text-gray-800 hover:bg-gray-100"
                }
              >
                {isTableConfigSliderEnabled ? "Enabled" : "Disabled"}
              </Badge>
              {!isTableConfigPageEnabled && (
                <Badge variant="outline" className="text-xs">
                  Requires page to be enabled
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Summary Card */}
      <Card>
        <CardHeader>
          <CardTitle>Current Configuration</CardTitle>
          <CardDescription>
            Overview of current feature flag settings
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-medium">Table Config Page</span>
              <Badge
                variant={isTableConfigPageEnabled ? "default" : "secondary"}
                className={
                  isTableConfigPageEnabled
                    ? "bg-green-100 text-green-800 hover:bg-green-100"
                    : "bg-gray-100 text-gray-800 hover:bg-gray-100"
                }
              >
                {isTableConfigPageEnabled ? "Visible" : "Hidden"}
              </Badge>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <span className="font-medium">Slider Input</span>
              <Badge
                variant={isTableConfigSliderEnabled ? "default" : "secondary"}
                className={
                  isTableConfigSliderEnabled
                    ? "bg-green-100 text-green-800 hover:bg-green-100"
                    : "bg-gray-100 text-gray-800 hover:bg-gray-100"
                }
              >
                {isTableConfigSliderEnabled ? "Available" : "Hidden"}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
