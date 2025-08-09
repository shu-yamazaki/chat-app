"use client";

type Props = {
  text: string;
};

export default function DateSeparator({ text }: Props) {
  return (
    <div className="flex justify-center my-2">
      <span className="bg-gray-300 text-xs text-gray-700 px-3 py-1 rounded-full shadow">
        {text}
      </span>
    </div>
  );
}
