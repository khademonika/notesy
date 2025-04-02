import React from 'react'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import EmptyState from '../EmptyState'
import { Note } from '@/lib/types'
import { Button } from './button'
import { formatDate } from '@/lib/storage'
import { Trash2 } from 'lucide-react'
import { ScrollArea } from './scroll-area'


interface NoteSiderProps {
    notes: Note[]
    onSelectNote: (note:Note)=>void
    createNewNote:()=> void
    ondeleteNote:(id:string)=>void
    activeNoteId?: string
}
function NotesSider({ notes,ondeleteNote ,onSelectNote,activeNoteId,createNewNote}: NoteSiderProps) {

    return (
        <Card className='h-full '>
            <CardHeader>
                <CardTitle>My Notes</CardTitle>
            </CardHeader>
            <CardContent>
                {notes.length === 0 ? (
                    <EmptyState message='No notes yet' buttonText="Create your first note" 
                    onButtonClick={createNewNote} />
                ) : (
                    <ScrollArea className='h-[calc(100vh-250px)]'>
                           <div>
                        {notes.map((note) => (
                            <div key={note.id}
                            onClick={()=>onSelectNote(note)}
                                className={`p-3 rounded-md cursor-pointer hover:bg-accent transition-colors ${
                                    activeNoteId === note.id ? "bg-accent":""
                                }`}
                            >
                                <div className='flex justify-between items-center'>
                                    <div>
                                        <h3 className='font-medium'>
                                            {note.title.substring(0, 30)}
                                            {note.title.length > 30 ? "..." : ""}
                                        </h3>
                                        <p className='text-sm text-muted-foreground'>
                                            {note.content.substring(0, 40)}
                                            {note.content.length > 40 ? "..." : ""}
                                        </p>
                                        <p className='text-sm text-muted-foreground'>
                                            {formatDate(note.createAt)}
                                        </p>
                                    </div>
                                    <Button 
                                    variant="ghost"
                                    size="icon"
                                    className='h-8 w-8 text-muted-foreground hover:text-destructive cursor-pointer'
                                    onClick={(e)=>{
                                        e.stopPropagation()
                                        ondeleteNote(note.id)
                                    }}>
                                        <Trash2 className='h-4 w-4'/></Button>

                                </div>
                            </div>
                        ))}
                    </div>
                    </ScrollArea>
                 
                )}
            </CardContent>

        </Card>

    )
}

export default NotesSider
