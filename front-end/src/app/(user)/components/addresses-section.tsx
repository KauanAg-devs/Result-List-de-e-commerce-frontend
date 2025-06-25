import { Plus } from "lucide-react";
import { AddressCard } from "./address-card";

export const AddressesSection = () => {
  const onDelete = ()=> {

  }
  
  const onEdit = ()=> {

  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-zinc-900">Meus Endereços</h2>
        <button className="flex items-center gap-2 px-4 py-2 bg-zinc-600 text-white rounded-lg hover:bg-zinc-700">
          <Plus size={16} />
          Adicionar Endereço
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AddressCard
          onEdit={onEdit}
          onDelete={onDelete}
          title="Casa"
          address="Rua das Flores, 123, Apto 45, Vila Madalena, São Paulo - SP, 01234-567"
          isDefault={true}
        />
        <AddressCard
          onEdit={onEdit}
          onDelete={onDelete}
          title="Trabalho"
          address="Av. Paulista, 1000, Sala 1001, Bela Vista, São Paulo - SP, 01310-100"
          isDefault={false}
        />
      </div>
    </div>
  );
};
