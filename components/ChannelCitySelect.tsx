import { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Button } from './ui/button';
import { Check, ChevronsUpDown } from 'lucide-react';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from './ui/command';
import { cn } from '@/lib/utils';

export const cities = [
  {
    value: 'new-york',
    label: 'New York',
  },
  {
    value: 'miami',
    label: 'Miami',
  },
  {
    value: 'los-angeles',
    label: 'Los Angeles',
  },
  {
    value: 'dallas',
    label: 'Dallas',
  },
  {
    value: 'phoenix',
    label: 'Phoenix',
  },
];

export interface ChannelCitySelectProps {
  selectedValue: string;
  // eslint-disable-next-line no-unused-vars
  onSelect: (value: string) => void;
}

export const ChannelCitySelect = ({
  selectedValue,
  onSelect,
}: ChannelCitySelectProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="flex w-[200px] justify-between"
        >
          {selectedValue
            ? cities.find((city) => city.value === selectedValue)?.label
            : 'Select city...'}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search city..." />
          <CommandEmpty>No city found.</CommandEmpty>
          <CommandGroup>
            {cities.map((city) => (
              <CommandItem
                key={city.value}
                value={city.value}
                onSelect={(currentValue) => {
                  onSelect(currentValue === selectedValue ? '' : currentValue);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    'mr-2 h-4 w-4',
                    selectedValue === city.value ? 'opacity-100' : 'opacity-0'
                  )}
                />
                {city.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
