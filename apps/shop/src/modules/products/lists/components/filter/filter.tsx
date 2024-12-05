'use client';
import { IconChevronDown } from '@tabler/icons-react';

export const ProductsFilter = () => {
  return (
    <div className="space-y-2 py-12">
      {Array.from({ length: 20 }).map((v, k) => {
        return (
          <details
            key={k as number}
            className="overflow-hidden rounded border border-gray-300 [&_summary::-webkit-details-marker]:hidden"
          >
            <summary className="flex cursor-pointer items-center justify-between gap-2 bg-white p-4 text-gray-900 transition">
              <span className="text-sm font-medium"> Availability </span>
              <span className="transition group-open:-rotate-180">
                <IconChevronDown />
              </span>
            </summary>

            <div className="border-t border-gray-200 bg-white">
              <header className="flex items-center justify-between p-4">
                <span className="text-sm text-gray-700"> 0 Selected </span>

                <button
                  type="button"
                  className="text-sm text-gray-900 underline underline-offset-4"
                >
                  Reset
                </button>
              </header>

              <ul className="space-y-1 border-t border-gray-200 p-4">
                <li>
                  <label
                    htmlFor="FilterInStock"
                    className="inline-flex items-center gap-2"
                  >
                    <input
                      type="checkbox"
                      id="FilterInStock"
                      className="size-5 rounded border-gray-300"
                    />

                    <span className="text-sm font-medium text-gray-700">
                      {' '}
                      In Stock (5+){' '}
                    </span>
                  </label>
                </li>

                <li>
                  <label
                    htmlFor="FilterPreOrder"
                    className="inline-flex items-center gap-2"
                  >
                    <input
                      type="checkbox"
                      id="FilterPreOrder"
                      className="size-5 rounded border-gray-300"
                    />

                    <span className="text-sm font-medium text-gray-700">
                      {' '}
                      Pre Order (3+){' '}
                    </span>
                  </label>
                </li>

                <li>
                  <label
                    htmlFor="FilterOutOfStock"
                    className="inline-flex items-center gap-2"
                  >
                    <input
                      type="checkbox"
                      id="FilterOutOfStock"
                      className="size-5 rounded border-gray-300"
                    />

                    <span className="text-sm font-medium text-gray-700">
                      {' '}
                      Out of Stock (10+){' '}
                    </span>
                  </label>
                </li>
              </ul>
            </div>
          </details>
        );
      })}
    </div>
  );
};
