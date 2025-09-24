import './App.css'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

async function fetchGame() {
  const res = await fetch('/game')
  if (!res.ok) throw new Error('Failed to load /game')
  return res.json()
}

export default function App() {
  // 1) All hooks live at the top, INSIDE the component
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: async (index: number) => {
      const res = await fetch('/move', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ index }),
      })
      if (!res.ok) throw new Error('Move failed')
      return res.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['game'] })
    },
  })

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['game'],
    queryFn: fetchGame,
  })

  // 2) Conditional UI AFTER hooks
  if (isLoading) return <div className="m-20">Loading…</div>
  if (isError || !data) return <div className="m-20">Error: {(error as Error)?.message ?? 'loading game'}</div>

  // 3) Normal render
  return (
    <div className="m-20">
      <h1 className="text-xl font-bold underline">Tic Tac Toe</h1>
      <div className="grid grid-cols-3 gap-2">
        {data.board.map((b: string | null, i: number) => (
          <button
            key={i}
            className="w-full aspect-square border"
            onClick={() => mutation.mutate(i)}
            disabled={mutation.isPending}
          >
            {b}
          </button>
        ))}
      </div>
      <p className="font-bold mt-3"> Turn: {String(data.turn)}</p>
      <p className="text-green-600"> Winner: {data.endState}</p>
      {/* If your API later includes endState, swap the line above to show it */}
    </div>
  )
}
