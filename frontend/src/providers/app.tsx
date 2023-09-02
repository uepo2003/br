import { Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import { LoadingSpinner } from "@/components/spinner";
import { AppRoutes } from "@/routes";

const router = createBrowserRouter(AppRoutes);

export function AppProvider(): JSX.Element {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <RouterProvider router={router} />
      </ErrorBoundary>
    </Suspense>
  );
}

function ErrorFallback(): JSX.Element {
  return (
    <div role="alert">
      <h2>Ooops, something went wrong!</h2>
      <button onClick={() => window.location.assign(window.location.origin)}>
        Refresh
      </button>
    </div>
  );
}
