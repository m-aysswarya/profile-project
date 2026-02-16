import { CirclePlus } from "lucide-react";

const SectionHeader = ({ title, onAdd }) => {
    return (
        <div className="flex justify-between items-center mb-4">
            <h3 className="text-[16px] font-semibold">{title}</h3>

            {onAdd && (
                <CirclePlus
                    onClick={onAdd}
                    className="w-5 h-5 text-[#6B7280] cursor-pointer hover:text-black transition"
                />
            )}
        </div>
    );
};

export default SectionHeader;
