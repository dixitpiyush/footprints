import { cn } from '@/lib/utils';
import { getCategoryColors } from '@/utils/category-colors';

interface CategoryPillProps extends React.HTMLAttributes<HTMLSpanElement> {
  category: string;
  selected?: boolean;
  disabled?: boolean;
}

export default function CategoryPill({ category, disabled, selected = false }: CategoryPillProps) {
  const [defaultColor, selectedColor]: [string, string] = getCategoryColors(category);

  const getSelectedColor = (selected: boolean): string => {
    return selected ? selectedColor : defaultColor;
  };

  return (
    <span
      className={cn(
        'cursor-pointer rounded-3xl px-3 py-1 text-xs font-medium text-light-primary/80 dark:text-dark-primary/80 ',
        disabled
          ? `cursor-not-allowed bg-light-primary/10 opacity-50 dark:bg-dark-primary/10 dark:text-dark-primary/50`
          : getSelectedColor(selected)
      )}
    >
      {category}
    </span>
  );
}
