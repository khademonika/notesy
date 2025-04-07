import React from 'react'
import { Card, CardContent, CardFooter, CardTitle } from './ui/card'
import { Note } from '@/lib/types'
import { formatDate } from '@/lib/storage'
import { Button } from './ui/button'
import { ScrollArea } from './ui/scroll-area'
interface NoteViewProps {
    note: Note
    onEdit:()=>void
}
function NoteView({ note ,onEdit}: NoteViewProps) {
    return (
        <Card className='px-5'>
            <CardTitle>{note.title}</CardTitle>
            <p className='text-sm text-muted-foreground'>
                {formatDate(note.createAt)}
            </p>
            <ScrollArea className='h-[calc(100vh-350px)]'><CardContent>{note.content}</CardContent></ScrollArea>
            
            <CardFooter className="flex justify-end">
                <Button onClick={onEdit}>Edit Note</Button>
            </CardFooter>
        </Card>
    )
}

export default NoteView

