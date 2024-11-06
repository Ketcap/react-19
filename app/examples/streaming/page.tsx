import { Suspense } from "react";
import { SlowComponent } from "./slow-component";
import { MediumComponent } from "./medium-component";
import { FastComponent } from "./fast-component";

export default function Page() {
  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Streaming SSR Demo</h1>

      <div className="space-y-4">
        <Suspense
          fallback={
            <div className="p-4 border rounded animate-pulse">
              Loading fast component...
            </div>
          }
        >
          <FastComponent />
        </Suspense>

        <Suspense
          fallback={
            <div className="p-4 border rounded animate-pulse">
              Loading medium component...
            </div>
          }
        >
          <MediumComponent />
        </Suspense>

        <Suspense
          fallback={
            <div className="p-4 border rounded animate-pulse">
              Loading slow component...
            </div>
          }
        >
          <SlowComponent />
        </Suspense>
      </div>
    </div>
  );
}
