import {create} from 'zustand';

const userContext = create((set) => ({
    fullname : "",
    email : "",
    role : "",
    setFullname : set((name) => ({fullname : name})),
    setEmail : set((newEmail) => ({email : newEmail})),
    setRole : set((newRole) => ({role : newRole})),
}));