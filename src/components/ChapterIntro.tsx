/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

interface ChapterIntroProps {
  id?: string;
  num: string;
  title: string;
  subtitle: string;
  subheading?: string;
  inputs?: string[];
  tools?: string[];
  outputs?: string[];
}

export default function ChapterIntro({
  id,
  num,
  title,
  subtitle,
  subheading,
  inputs,
  tools,
  outputs,
}: ChapterIntroProps) {
  return (
    <section
      id={id}
      className="py-12 px-8 lg:px-12 bg-[#0d1f3c] text-white border-b border-slate-700"
    >
      <div className="flex items-start gap-4 mb-6">
        <span className="font-mono text-[11px] bg-[#1a3a5c] text-slate-300 px-2.5 py-1 rounded-lg font-bold flex-shrink-0 mt-0.5">
          {num}
        </span>
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-[#4ec8cc] mb-0.5">
            {subheading || `Capítulo ${num} · PMBOK® 6.ª ed.`}
          </p>
          <h2 className="font-serif text-2xl font-bold text-white leading-tight">
            {title}
          </h2>
          <p className="text-slate-400 text-sm mt-1">{subtitle}</p>
        </div>
      </div>

      {(inputs || tools || outputs) && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-6">
          {inputs && (
            <div className="bg-blue-900/40 border border-blue-700/40 rounded-xl p-5">
              <p className="font-mono text-[10px] text-blue-300 uppercase tracking-wider mb-3">
                Entradas
              </p>
              <ol className="space-y-2">
                {inputs.map((item, i) => (
                  <li key={i} className="flex gap-2 text-xs text-blue-100">
                    <span className="font-mono text-blue-400 flex-shrink-0 font-bold">
                      {i + 1}.
                    </span>
                    {item}
                  </li>
                ))}
              </ol>
            </div>
          )}
          {tools && (
            <div className="bg-amber-900/30 border border-amber-700/40 rounded-xl p-5">
              <p className="font-mono text-[10px] text-amber-300 uppercase tracking-wider mb-3">
                Herramientas y Técnicas
              </p>
              <ol className="space-y-2">
                {tools.map((item, i) => (
                  <li key={i} className="flex gap-2 text-xs text-amber-100">
                    <span className="font-mono text-amber-400 flex-shrink-0 font-bold">
                      {i + 1}.
                    </span>
                    {item}
                  </li>
                ))}
              </ol>
            </div>
          )}
          {outputs && (
            <div className="bg-emerald-900/30 border border-emerald-700/40 rounded-xl p-5">
              <p className="font-mono text-[10px] text-emerald-300 uppercase tracking-wider mb-3">
                Salidas
              </p>
              <ol className="space-y-2">
                {outputs.map((item, i) => (
                  <li key={i} className="flex gap-2 text-xs text-emerald-100">
                    <span className="font-mono text-emerald-400 flex-shrink-0 font-bold">
                      {i + 1}.
                    </span>
                    {item}
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
