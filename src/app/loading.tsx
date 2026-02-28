export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <div className="rounded-3xl border border-black/10 bg-white p-8">
        <div className="h-4 w-24 rounded bg-black/10" />
        <div className="mt-4 h-10 w-2/3 rounded bg-black/10" />
        <div className="mt-4 h-4 w-1/2 rounded bg-black/10" />
        <div className="mt-8 grid gap-3 md:grid-cols-2">
          <div className="h-24 rounded-2xl bg-black/10" />
          <div className="h-24 rounded-2xl bg-black/10" />
          <div className="h-24 rounded-2xl bg-black/10" />
          <div className="h-24 rounded-2xl bg-black/10" />
        </div>
      </div>
    </div>
  );
}