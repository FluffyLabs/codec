export function Json({ result }: { result: string }) {
  return (
    <div className="flex-1 overflow-y-scroll overflow-x-auto p-4 m-4 bg-[#ddd] dark:bg-secondary">
      <pre>{result}</pre>
    </div>
  );
}
