import React from "react";
import { useRouter } from 'next/router'

export default function Q() {
    const router = useRouter()
    const { qid } = router.query

    return (
        <p>{qid}</p>
    )
}