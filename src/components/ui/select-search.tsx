import React from 'react';
import { Command } from 'cmdk';

interface SelectSearchProps {
  placeholder?: string;
}

export function SelectSearch({ placeholder }: SelectSearchProps) {
  return (
    <div className="px-3 py-2 border-b">
      <Command.Input 
        placeholder={placeholder}
        className="w-full bg-transparent outline-none placeholder:text-muted-foreground"
        autoFocus
      />
    </div>
  );
} 