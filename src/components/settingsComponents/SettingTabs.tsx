"use client";

import React, { useState } from "react";

const SettingTabs = ({ tabData }: { tabData: any }) => {
  const [activeTab, setActiveTab] = useState(tabData[0].id);
  return (
    <div>
      {/* Navigation des onglets */}
      <div className="">
        <ul
          className="flex flex-wrap -mb-px text-sm font-medium text-center"
          role="tablist"
        >
          {tabData.map((tab: any) => (
            <li key={tab.id} className="w-1/2" role="presentation">
              <button
                className={`inline-block w-full p-4 border-b-2 rounded-t-lg ${
                  activeTab === tab.id
                    ? "text-green-600 border-green-600"
                    : "hover:text-black hover:border-gray-300"
                }`}
                type="button"
                role="tab"
                aria-controls={tab.id}
                aria-selected={activeTab === tab.id}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Contenu des onglets */}
      <div id="tab-content" className="bg-green-600">
        {tabData.map((tab: any) => (
          <div
            key={tab.id}
            className={`p-4 rounded-lg ${
              activeTab === tab.id ? "block" : "hidden"
            }`}
            role="tabpanel"
            aria-labelledby={`${tab.id}-tab`}
          >
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {tab.content}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SettingTabs;
