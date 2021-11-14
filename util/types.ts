export type UserType = {
    id: string
    email: string
    name: string 
}

export type CourseType = {
    id: string
    name: string
    code: string
    htas: string[]
    tas: string[]
}

export type QueueType = {
    id: string
    course: string
    location: string
    tickets: string[]
}

export type TicketType = {
    id: string
    student: string
    message: string
}
