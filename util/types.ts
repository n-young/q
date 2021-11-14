export type UserType = {
    id: string
    email: string
    name: string 
}

export type CourseType = {
    id: string
    name: string
    code: string
    tas: string[]
}

export type QueueType = {
    id: string
    course: string
    location: string
    tickets: string[] // TODO: Make this into TicketType
}

export type TicketType = {
    id: string
    student: string
    message: string
}
