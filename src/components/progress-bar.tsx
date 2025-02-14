interface ProgressBarProps {
  current: number
  total: number
}

export function ProgressBar({ current, total }: ProgressBarProps) {
  const percentage = (current / total) * 100

  return (
    <div className="space-y-2">
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <div 
          className="h-full bg-primary transition-all duration-500 ease-in-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <p className="text-center text-sm text-muted-foreground font-medium">
        {current}/{total}
      </p>
    </div>
  )
}

