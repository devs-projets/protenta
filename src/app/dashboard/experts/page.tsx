import MoyennesCardList from "@/components/MoyennesCardList";
import { MoyenneTabs } from "@/components/view/MoyenneTab";
import { TableComponent } from "@/components/view/Table";
import React from "react";

const page = () => {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0 h-screen">
      <h1 className="text-center text-2xl font-bold">Moyennes</h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6">
        <MoyennesCardList />
      </div>
      <div className="flex-1 rounded-xl bg-muted/50 p-5 overflow-hidden" style={{ maxHeight: "calc(100vh - 4rem)" }}>
        <div className="h-full overflow-y-auto">
          <MoyenneTabs />
        </div>
      </div>
    </div>
  );
};

export default page;
