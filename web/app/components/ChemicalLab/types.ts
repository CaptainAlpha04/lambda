// types.ts
export interface Chemical {
    name: string
    color: string
    formula?: string
    state_at_room_temp?: string
    safety_info?: string
  }
  
  export interface Reaction {
    chemicals: Chemical[]
    result: Chemical
    timestamp: number
  }