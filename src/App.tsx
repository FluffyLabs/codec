import { AppsSidebar, Button, Header } from "@fluffylabs/shared-ui";
import { utils } from "@typeberry/lib";
import { Settings } from "lucide-react";
import { useState } from "react";
import logo from "./assets/logo.svg";
import SettingsDialog from "./components/SettingsDialog";
import { Checkbox } from "./components/ui/Checkbox";
import { Codec } from "./pages/Codec";

const VersionDisplay = () => {
  const currentVersion = utils.CURRENT_VERSION as string;
  const currentSuite = utils.CURRENT_SUITE as string;

  return (
    <span className="text-sm text-muted-foreground mr-2">
      GP: {currentVersion}, Suite: {currentSuite}
    </span>
  );
};

const AppHeader = ({
  onOpenSettings,
  isDiffEnabled,
  setIsDiffEnabled,
}: {
  onOpenSettings: () => void;
  isDiffEnabled: boolean;
  setIsDiffEnabled: (enabled: boolean) => void;
}) => {
  return (
    <Header
      toolNameSrc={logo}
      ghRepoName="codec"
      keepNameWhenSmall
      endSlot={
        <div className="flex items-center gap-4 pr-4">
          <VersionDisplay />
          <div className="flex items-center">
            <Checkbox
              label="Show Diff"
              checked={isDiffEnabled}
              onChange={(e) => setIsDiffEnabled(e.target.checked)}
              className="text-muted-foreground"
            />
          </div>
          <Button onClick={onOpenSettings} size="sm" aria-label="Settings" title="Settings" forcedColorScheme="dark">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      }
    />
  );
};

const AppContent = () => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isDiffEnabled, setIsDiffEnabled] = useState(true);

  return (
    <div className="flex flex-col overflow-hidden h-[100dvh] bg-sidebar dark:bg-[#242424]">
      <div className="h-[87px]">
        <AppHeader
          onOpenSettings={() => setIsSettingsOpen(true)}
          isDiffEnabled={isDiffEnabled}
          setIsDiffEnabled={setIsDiffEnabled}
        />
      </div>
      <div className="flex h-full">
        <div className="max-sm:hidden">
          <AppsSidebar activeLink="codec" className="h-full" enableDarkModeToggle={true} />
        </div>

        <div className="w-full h-[calc(100dvh-87px)] overflow-hidden text-left">
          <Codec isDiffEnabled={isDiffEnabled} />
        </div>
      </div>

      <SettingsDialog isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
    </div>
  );
};

export default function App() {
  return <AppContent />;
}
