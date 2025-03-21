import { createClient } from '@/utils/supabase/server';

export default async function Notes() {
  const supabase = await createClient();
  const { data: notes } = await supabase.from("notes").select();

  return (
    <div className="max-w-lg mx-auto mt-10 p-4 bg-gray-100 rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-4">Notes</h1>
      <ul className="list-disc pl-5">
        {notes?.map((note) => (
          <li key={note.id} className="text-lg text-gray-700">{note.title}</li>
        ))}
      </ul>
    </div>
  );
}
