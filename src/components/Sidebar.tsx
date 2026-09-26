/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { TOC_CHAPTERS } from "../data";

interface SidebarProps {
  activeSection: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ activeSection, isOpen, onClose }: SidebarProps) {
  const [openChapters, setOpenChapters] = useState<Set<string>>(
    () => new Set(TOC_CHAPTERS.map((ch) => ch.num || ch.label))
  );
  
  const [openGroups, setOpenGroups] = useState<Set<string>>(
    () => new Set(TOC_CHAPTERS.flatMap((ch) => (ch.groups ?? []).map((g) => `${ch.num}-${g.label}`)))
  );

  const toggleChapter = (key: string) => {
    setOpenChapters((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const toggleGroup = (key: string) => {
    setOpenGroups((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed top-14 left-0 bottom-0 w-64 bg-white border-r border-slate-200 overflow-y-auto z-40 transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-5">
          <p className="font-mono text-xs font-bold uppercase tracking-wider text-slate-500 mb-5">
            Índice
          </p>
          <nav className="space-y-1">
            {TOC_CHAPTERS.map((ch) => {
              const chKey = ch.num || ch.label;
              const isChOpen = openChapters.has(chKey);
              const allSections = ch.groups
                ? ch.groups.flatMap((g) => g.sections)
                : (ch.sections ?? []);
              const hasActive = allSections.some(
                (s) => activeSection === s.href.replace("#", "")
              );

              return (
                <div key={chKey} className="border-b border-slate-50 pb-1">
                  <button
                    onClick={() => toggleChapter(chKey)}
                    className={`w-full flex items-center gap-2 px-2 py-2 rounded-lg transition-all hover:bg-slate-50 cursor-pointer ${
                      hasActive ? "text-[#0d7377]" : "text-slate-700"
                    }`}
                  >
                    {ch.num && (
                      <span
                        className={`font-mono text-[9px] rounded px-1.5 py-0.5 font-bold flex-shrink-0 ${
                          hasActive
                            ? "bg-[#e8f5f5] text-[#0d7377]"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {ch.num}
                      </span>
                    )}
                    <span className="font-mono text-[11px] uppercase tracking-wider leading-tight flex-1 text-left font-bold">
                      {ch.label}
                    </span>
                    <span className="text-[10px] flex-shrink-0 opacity-50">
                      {isChOpen ? "▲" : "▼"}
                    </span>
                  </button>

                  {isChOpen && ch.sections && (
                    <div className="space-y-0.5 pl-2 pb-1">
                      {ch.sections.map((s) => {
                        const isActive = activeSection === s.href.replace("#", "");
                        return (
                          <a
                            key={s.href}
                            href={s.href}
                            onClick={onClose}
                            className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all text-xs ${
                              isActive
                                ? "bg-[#e8f5f5] text-[#0d7377] font-semibold"
                                : "text-slate-700 hover:text-slate-800 hover:bg-slate-50"
                            }`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                                isActive ? "bg-[#0d7377]" : "bg-slate-200"
                              }`}
                            />
                            {s.label}
                          </a>
                        );
                      })}
                    </div>
                  )}

                  {isChOpen && ch.groups && (
                    <div className="pl-2 pb-1 space-y-0.5">
                      {ch.groups.map((group) => {
                        const gKey = `${ch.num}-${group.label}`;
                        const isGOpen = openGroups.has(gKey);
                        const gHasActive = group.sections.some(
                          (s) => activeSection === s.href.replace("#", "")
                        );

                        return (
                          <div key={gKey}>
                            <button
                              onClick={() => toggleGroup(gKey)}
                              className="w-full flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-slate-50 transition-all cursor-pointer"
                            >
                              <span
                                className={`font-mono text-[9px] uppercase tracking-wider font-bold flex-1 text-left ${
                                  gHasActive ? group.color : "text-slate-500"
                                }`}
                              >
                                {group.label}
                              </span>
                              <span className="text-[9px] opacity-40">
                                {isGOpen ? "▲" : "▼"}
                              </span>
                            </button>
                            {isGOpen && (
                              <div className="space-y-0.5 pl-2">
                                {group.sections.map((s) => {
                                  const isActive = activeSection === s.href.replace("#", "");
                                  return (
                                    <a
                                      key={s.href}
                                      href={s.href}
                                      onClick={onClose}
                                      className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all text-xs ${
                                        isActive
                                          ? "bg-[#e8f5f5] text-[#0d7377] font-semibold"
                                          : "text-slate-700 hover:text-slate-800 hover:bg-slate-50"
                                      }`}
                                    >
                                      <span
                                        className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                                          isActive ? "bg-[#0d7377]" : "bg-slate-200"
                                        }`}
                                      />
                                      {s.label}
                                    </a>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
          
          <div className="mt-8 pt-6 border-t border-slate-100">
            <p className="font-mono text-[10px] text-slate-550 leading-relaxed">
              Proyecto académico · UNTELS
              <br />
              Docente: Arqque Pantigozo Antonio
              <br />
              Lima, Perú · 2026
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
