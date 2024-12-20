import { create } from "zustand";
import { persist } from "zustand/middleware";


const useStore= create(
     persist(
    (set, get)=>({
    user:null,
    admin:false,
    addUser:(person)=>set({ user: person }),
    removeUser:()=>set(()=>({user:null, admin: false})),
    isAdmin: (boolean) => set({ admin: boolean }),
}),
{
    name: "zustand-store",
  }
));
export default useStore;
