/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

interface CiteProps {
  r: string;
}

export default function Cite({ r }: CiteProps) {
  return (
    <sup className="inline-flex items-center ml-0.5">
      <span
        className="text-blue-600 font-semibold text-[9px] bg-blue-50 border border-blue-200 px-1 py-0.5 rounded cursor-help leading-none"
        title={r}
      >
        [{r}]
      </span>
    </sup>
  );
}
