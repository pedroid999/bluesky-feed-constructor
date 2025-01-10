import { Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface RuleConstructorProps {
  rule: { type: string; value: string }
  onUpdate: (rule: { type: string; value: string }) => void
  onRemove: () => void
}

export default function RuleConstructor({ rule, onUpdate, onRemove }: RuleConstructorProps) {
  return (
    <div className="flex items-center space-x-2 bg-white dark:bg-gray-700 p-4 rounded-md shadow-sm">
      <Select
        value={rule.type}
        onValueChange={(newType) => onUpdate({ ...rule, type: newType })}
      >
        <SelectTrigger className="w-[180px] bg-gray-50 dark:bg-gray-600">
          <SelectValue placeholder="Select rule type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="keyword">Keyword</SelectItem>
          <SelectItem value="hashtag">Hashtag</SelectItem>
          <SelectItem value="user">User</SelectItem>
        </SelectContent>
      </Select>
      <Input
        value={rule.value}
        onChange={(e) => onUpdate({ ...rule, value: e.target.value })}
        placeholder={`Enter ${rule.type}`}
        className="flex-grow bg-gray-50 dark:bg-gray-600"
      />
      <Button type="button" variant="ghost" size="icon" onClick={onRemove} className="text-red-500 hover:text-red-600 hover:bg-red-100 dark:hover:bg-red-900">
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  )
}

