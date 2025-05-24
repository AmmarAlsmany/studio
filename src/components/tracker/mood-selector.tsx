"use client";

import { Button } from "@/components/ui/button";
import type { MoodScale } from "@/types";

interface MoodButtonProps {
  emoji: string;
  label: string;
  value: MoodScale;
  isSelected: boolean;
  onClick: (value: MoodScale) => void;
}

function MoodButton({ emoji, label, value, isSelected, onClick }: MoodButtonProps) {
  return (
    <Button
      type="button" // Important for preventing form submission if inside a form
      variant={isSelected ? "default" : "outline"}
      onClick={() => onClick(value)}
      className={`flex flex-col items-center justify-center h-24 w-20 p-2 transition-all duration-150 ease-in-out transform hover:scale-105 ${isSelected ? 'ring-2 ring-primary shadow-lg' : 'shadow-sm'}`}
      aria-pressed={isSelected}
      aria-label={`Select mood: ${label}`}
    >
      <span className="text-3xl mb-1">{emoji}</span>
      <span className="text-xs">{label}</span>
    </Button>
  );
}

interface MoodSelectorProps {
  value: MoodScale | undefined;
  onChange: (value: MoodScale) => void;
}

const moodOptions: { emoji: string; label: string; value: MoodScale }[] = [
  { emoji: "😞", label: "Awful", value: 1 },
  { emoji: "🙁", label: "Bad", value: 2 },
  { emoji: "😐", label: "Okay", value: 3 },
  { emoji: "🙂", label: "Good", value: 4 },
  { emoji: "😄", label: "Great", value: 5 },
];

export function MoodSelector({ value, onChange }: MoodSelectorProps) {
  return (
    <div className="flex justify-around space-x-2 md:space-x-3 flex-wrap gap-2">
      {moodOptions.map((option) => (
        <MoodButton
          key={option.value}
          emoji={option.emoji}
          label={option.label}
          value={option.value}
          isSelected={value === option.value}
          onClick={onChange}
        />
      ))}
    </div>
  );
}
