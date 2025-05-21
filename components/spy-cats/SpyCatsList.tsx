import { AxiosError } from 'axios';
import { useState } from 'react';
import { spyCatsApi } from './api';
import { EditSalaryModal } from './EditSalaryModal';
import { type SpyCat } from './schemas';

interface SpyCatsListProps {
  cats: SpyCat[];
  onUpdate: () => void;
}

export function SpyCatsList({ cats, onUpdate }: Readonly<SpyCatsListProps>) {
  const [editingCat, setEditingCat] = useState<SpyCat | null>(null);

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this spy cat?')) {
      try {
        console.log('Deleting spy cat:', id);
        await spyCatsApi.delete(id);
        onUpdate();
      } catch (error) {
        if (error instanceof AxiosError) {
          alert(`Failed to delete spy cat: ${error.response?.data.detail}`);
        } else {
          alert('Failed to delete spy cat');
        }
      }
    }
  };

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Breed
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Experience
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Salary
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {cats.map((cat) => (
              <tr key={cat.id}>
                <td className="px-6 py-4 whitespace-nowrap">{cat.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{cat.breed}</td>
                <td className="px-6 py-4 whitespace-nowrap">{cat.experience} years</td>
                <td className="px-6 py-4 whitespace-nowrap">${cat.salary}</td>
                <td className="px-6 py-4 whitespace-nowrap space-x-2">
                  <button
                    onClick={() => setEditingCat(cat)}
                    className="text-blue-600 hover:text-blue-800">
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(cat.id)}
                    className="text-red-600 hover:text-red-800">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editingCat && (
        <EditSalaryModal
          cat={editingCat}
          isOpen={true}
          onClose={() => setEditingCat(null)}
          onSuccess={onUpdate}
        />
      )}
    </div>
  );
}
