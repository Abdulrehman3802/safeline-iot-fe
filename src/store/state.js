import create from 'zustand'

const useDataStore = create((set) => ({
  data: [], // Initialize an empty array to store your data
  addData: (newItem) => set((state) => ({ data: [newItem] })),
}))

export default useDataStore
