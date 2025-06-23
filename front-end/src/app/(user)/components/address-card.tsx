import { Edit3, Trash2 } from "lucide-react"

export const AddressCard = ({ title, address, isDefault, onEdit, onDelete }) => (
  <div className="bg-white border border-zinc-200 rounded-2xl p-6 hover:shadow-lg transition-all duration-200">
    <div className="flex justify-between items-start mb-4">
      <div>
        <h3 className="font-semibold text-zinc-900 mb-1">{title}</h3>
        {isDefault && (
          <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
            Padrão
          </span>
        )}
      </div>
      <div className="flex gap-2">
        <button onClick={onEdit} className="p-2 hover:bg-zinc-100 rounded-lg">
          <Edit3 size={16} className="text-zinc-500" />
        </button>
        <button
          onClick={onDelete}
          className="p-2 hover:bg-zinc-100 rounded-lg"
        >
          <Trash2 size={16} className="text-zinc-500" />
        </button>
      </div>
    </div>
    <p className="text-zinc-600 text-sm leading-relaxed">{address}</p>
  </div>
);
