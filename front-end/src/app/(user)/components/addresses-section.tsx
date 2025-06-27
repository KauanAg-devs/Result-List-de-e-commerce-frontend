import { Plus } from "lucide-react";
import { AddressCard } from "./address-card";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";

export const AddressesSection = () => {
  const userProfile = useSelector((state: RootState) => state.userProfile.userProfile!)

  const onDelete = () => {};

  const onEdit = () => {};

  return (
    <div className="bg-white border border-zinc-200 rounded-2xl p-6 md:p-8 shadow-sm">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-zinc-900">Meus Endereços</h2>
          <button className="flex items-center gap-2 px-4 py-2 bg-zinc-600 text-white rounded-lg hover:bg-zinc-700">
            <Plus size={16} />
            Adicionar Endereço
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {userProfile.UserAddresses?.map((address, index) => {
            return (
              <AddressCard
                key={index}
                userAddress={address}
                isDefault={false}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
