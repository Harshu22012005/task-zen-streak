
interface DashboardHeaderProps {
  incompleteTasks: number;
}

export const DashboardHeader = ({ incompleteTasks }: DashboardHeaderProps) => {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">
        Good morning! 🌅
      </h1>
      <p className="text-gray-600">
        You have {incompleteTasks} tasks remaining today
      </p>
    </div>
  );
};
