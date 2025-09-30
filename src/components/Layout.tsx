import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import type { ReactNode } from "react";

type TabConfig = {
  value: string;
  label: string;
  content: ReactNode;
};

type LayoutProps = {
  tabs: TabConfig[];
  defaultValue?: string;
};

export function Layout({ tabs, defaultValue }: LayoutProps) {
  const first = tabs[0]?.value;
  return (
    <div className="h-screen w-screen flex flex-col bg-background text-foreground">
      <Tabs defaultValue={defaultValue ?? first} className="flex flex-1 flex-col">
        <div className="flex-none border-b">
          <div className="mx-auto w-full max-w-screen-xl px-3 py-2">
            <TabsList className="w-full">
              {tabs.map((t) => (
                <TabsTrigger key={t.value} value={t.value} className="data-[state=active]:shadow-sm">
                  {t.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
        </div>
        <div className="flex-1 overflow-auto">
          {tabs.map((t) => (
            <TabsContent key={t.value} value={t.value} className="h-full">
              <div className="mx-auto flex h-full max-w-screen-xl items-center justify-center p-4">
                <div className="w-full">{t.content}</div>
              </div>
            </TabsContent>
          ))}
        </div>
      </Tabs>
    </div>
  );
}

export default Layout;


