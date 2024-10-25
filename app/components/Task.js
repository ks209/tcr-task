import { Clock, User, Briefcase, CircleDashed, CircleCheck, CircleX } from 'lucide-react';
import axios from 'axios';

const Task = ({ task, fetchTask }) => {
  return (
    <div className="relative p-4 md:p-6 lg:p-8 bg-white dark:bg-gray-800 rounded-lg shadow-md max-w-md md:max-w-lg lg:max-w-xl mx-auto">
      <h3 className="text-lg md:text-xl font-semibold mb-2">{task.title}</h3>
      <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm md:text-base">
        {task.description}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm md:text-base">
        {/* Status and Member Information */}
        <div className="flex items-center">
          <Clock className="h-5 w-5 md:h-6 md:w-6 text-blue-500 mr-2" />
          <span className="font-medium">
            <span
              className={`ml-1 ${
                task.status === 'completed'
                  ? 'text-green-500'
                  : task.status === 'in-progress'
                  ? 'text-yellow-500'
                  : 'text-red-500'
              }`}
            >
              {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
            </span>
          </span>
        </div>
        <div className="flex items-center">
          <User className="h-5 w-5 md:h-6 md:w-6 text-purple-500 mr-2" />
          <span className="font-medium">{task.member}</span>
        </div>
        {/* Client Information */}
        <div className="flex items-center col-span-1 sm:col-span-2">
          <Briefcase className="h-5 w-5 md:h-6 md:w-6 text-gray-500 mr-2" />
          <span className="font-medium">{task.client}</span>
        </div>
      </div>
      {/* Action Icons */}
      <div className="flex gap-2 mt-4 justify-end">
        <CircleDashed
          className="h-5 w-5 md:h-6 md:w-6 cursor-pointer"
          color="yellow"
          onClick={async () => {
            await axios.get(`/api/tasks/inprogress/${task.id}`);
            await fetchTask(task);
          }}
        />
        <CircleCheck
          className="h-5 w-5 md:h-6 md:w-6 cursor-pointer"
          color="green"
          onClick={async () => {
            await axios.get(`/api/tasks/completed/${task.id}`);
            await fetchTask(task);
          }}
        />
        <CircleX
          className="h-5 w-5 md:h-6 md:w-6 cursor-pointer"
          color="red"
          onClick={async () => {
            await axios.get(`/api/tasks/remove/${task.id}`);
            await fetchTask(task);
          }}
        />
      </div>
    </div>
  );
};

export default Task;
