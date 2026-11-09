import { Check } from 'lucide-react';
import { Reveal } from './Reveal';

export type ContentNode =
  | { type: 'h2' | 'h3' | 'p'; text: string }
  | { type: 'ul'; items: string[] };

export function contentId(text: string, index: number) {
  return `${text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}-${index}`;
}

export function ContentBlocks({ nodes }: { nodes: ContentNode[] }) {
  return (
    <div>
      {nodes.map((node, index) => {
        const key = `${node.type}-${index}`;
        if (node.type === 'h2') {
          return (
            <Reveal key={key}>
              <h2 id={contentId(node.text, index)} className="mt-10 scroll-mt-32 border-t border-line pt-8 text-[26px] first:mt-0 first:border-0 first:pt-0 sm:text-[30px]">{node.text}</h2>
            </Reveal>
          );
        }
        if (node.type === 'h3') {
          return <h3 key={key} id={contentId(node.text, index)} className="mt-8 scroll-mt-32 text-[21px]">{node.text}</h3>;
        }
        if (node.type === 'ul') {
          return (
            <ul key={key} className="mt-5 grid gap-3 sm:grid-cols-2">
              {node.items.map((item, itemIndex) => (
                <li key={`${item}-${itemIndex}`} className="flex items-start gap-3 rounded-xl border border-line bg-surface p-4 text-[15px] leading-7 text-[#45515e]">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold/20"><Check className="h-3 w-3 text-navy" strokeWidth={2.5} aria-hidden="true" /></span>
                  {item}
                </li>
              ))}
            </ul>
          );
        }
        return <p key={key} className="mt-5 text-[16px] leading-8 text-body">{node.text}</p>;
      })}
    </div>
  );
}
