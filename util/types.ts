export interface UserType {
    id: string
    email: string
    name: string 
}

export interface CourseType {
    id: string
    name: string
    code: string
    htas: string[]
    tas: string[]
}

export interface QueueType {
    id: string
    course: string
    location: string
    tickets: string[]
}

export enum TicketStatus {
    Unclaimed,
    Claimed,
    Missing,
    Resolved
}

export interface TicketType {
    id: string
    student: string
    message: string
    status: TicketStatus
}