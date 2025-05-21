import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { spyCatsApi } from './api';
import { spyCatEditSchema, type SpyCat, type SpyCatEditInput } from './schemas';

interface EditSalaryModalProps {
  cat: SpyCat;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function EditSalaryModal({
  cat,
  isOpen,
  onClose,
  onSuccess,
}: Readonly<EditSalaryModalProps>) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SpyCatEditInput>({
    resolver: zodResolver(spyCatEditSchema),
    defaultValues: {
      salary: cat.salary,
    },
  });

  const onSubmit = async (data: SpyCatEditInput) => {
    try {
      await spyCatsApi.update(cat.id, data);
      onSuccess();
      onClose();
    } catch (error) {
      console.error('Failed to update salary:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Edit Salary for {cat.name}</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="salary" className="block text-sm font-medium">
              New Salary
            </label>
            <input
              {...register('salary', { valueAsNumber: true })}
              type="number"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
            />
            {errors.salary && <p className="mt-1 text-sm text-red-600">{errors.salary.message}</p>}
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800">
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50">
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
