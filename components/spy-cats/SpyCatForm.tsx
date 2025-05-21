import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { spyCatsApi } from './api';
import { spyCatCreateSchema, type SpyCatCreateInput } from './schemas';

interface SpyCatFormProps {
  onSuccess: () => void;
}

export function SpyCatForm({ onSuccess }: Readonly<SpyCatFormProps>) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SpyCatCreateInput>({
    defaultValues: {
      name: '',
      breed: '',
      experience: 1,
      salary: 1,
    },
    resolver: zodResolver(spyCatCreateSchema),
  });

  const onSubmit = async (data: SpyCatCreateInput) => {
    try {
      await spyCatsApi.create(data);
      reset();
      onSuccess();
    } catch (error) {
      if (error instanceof AxiosError) {
        alert(`Failed to create spy cat: ${error.response?.data.detail}`);
      } else {
        alert('Failed to create spy cat');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium">
          Name
        </label>
        <input
          {...register('name')}
          type="text"
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
        />
        {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
      </div>

      <div>
        <label htmlFor="breed" className="block text-sm font-medium">
          Breed
        </label>
        <input
          {...register('breed')}
          type="text"
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
        />
        {errors.breed && <p className="mt-1 text-sm text-red-600">{errors.breed.message}</p>}
      </div>

      <div>
        <label htmlFor="experience" className="block text-sm font-medium">
          Years of Experience
        </label>
        <input
          {...register('experience', { valueAsNumber: true })}
          type="number"
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
        />
        {errors.experience && (
          <p className="mt-1 text-sm text-red-600">{errors.experience.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="salary" className="block text-sm font-medium">
          Salary
        </label>
        <input
          {...register('salary', { valueAsNumber: true })}
          type="number"
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
        />
        {errors.salary && <p className="mt-1 text-sm text-red-600">{errors.salary.message}</p>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50">
        {isSubmitting ? 'Adding...' : 'Add Spy Cat'}
      </button>
    </form>
  );
}
