import Card from "../ui/Card";
import SectionHeader from "../ui/SectionHeader";

const Skills = ({ skills = [], onAdd }) => {
    return (
        <Card className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 transition-colors duration-300">
            <SectionHeader
                title="Skills"
                onAdd={onAdd}
            />

            <div className="flex flex-wrap gap-2 mt-2">
                {skills.map((skill) => (
                    <span
                        key={skill.name}
                        className="px-3 py-1 text-xs rounded-full 
                       bg-gray-100 dark:bg-gray-700 
                       border border-gray-200 dark:border-gray-600 
                       text-gray-800 dark:text-gray-200 transition-colors duration-300"
                    >
                        {skill.name}
                    </span>
                ))}
            </div>
        </Card>
    );
};

export default Skills;
