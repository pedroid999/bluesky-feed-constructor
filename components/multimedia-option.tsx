import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'

interface MultimediaOptionProps {
  label: string
  checked: boolean
  onChange: (checked: boolean) => void
}

export default function MultimediaOption({ label, checked, onChange }: MultimediaOptionProps) {
  return (
    <div className="flex items-center space-x-2 bg-white dark:bg-gray-700 p-4 rounded-md shadow-sm">
      <Switch
        id={label}
        checked={checked}
        onCheckedChange={onChange}
        className="data-[state=checked]:bg-blue-500"
      />
      <Label htmlFor={label} className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</Label>
    </div>
  )
}

