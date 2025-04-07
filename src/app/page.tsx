"use client"


import EmptyState from "@/components/EmptyState";
import Header from "@/components/header";
import NoteEditor from "@/components/NoteEditor";
import NoteView from "@/components/noteView";
import NotesSider from "@/components/ui/notesSider";
import { loadNotes, saveNotes } from "@/lib/storage";
import { Note } from "@/lib/types";
import { useEffect, useState } from "react";
export default function Home() {
  const [notes, setNotes] = useState<Note[]>([])
  const [activeNote, setActiveNote] = useState<Note | null>(null)
  const [isEditing,setIsEditing] = useState(false)
  // console.log(activeNote);

  useEffect(()=>{
    setNotes(loadNotes())
      },[])
  useEffect(()=>{
saveNotes(notes)
  },[notes])
  const createNewNote = () => {
    const newNote: Note = {
      id: Date.now().toString(),
      title: "New Note",
      content: "",
      createAt: Date.now()

    }
    // console.log(newNote);
    
    setNotes([newNote, ...notes])
    setActiveNote(newNote)
    setIsEditing(true)
  }
  const cancelEdit = ()=>{
    setIsEditing(false)
  }
  const saveNote = (updatedNote:Note)=>{
    setNotes(notes.map(note=>(note.id === updatedNote.id ? updatedNote: note)))
    setActiveNote(updatedNote)

    setIsEditing(false)
  }
  const renderNoteContent = ()=>{
    if(!activeNote && notes.length===0){
      return (
        <EmptyState message="Create your first note to get started" 
        buttonText="New Note"
        onButtonClick={createNewNote} />
      )
    }
    if(activeNote && isEditing){
      return <NoteEditor note={activeNote} onSave={saveNote} onCancle={cancelEdit}/>
    }
    if(activeNote){
      return <NoteView note={activeNote} onEdit = {()=>setIsEditing(true)}/>
    } return null
  }
  const selectNote = (note:Note)=>{
    setActiveNote(note)
    setIsEditing(false)
  }
  const deleteNote = (id:string)=>{
 setNotes(notes.filter(note => note.id != id))
if(activeNote&& activeNote.id === id)
  setActiveNote(null)
  }
  return (
    <div className="flex flex-col min-h-screen">
      <Header OnNewNote={createNewNote} />
      <main className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-3 gap-6 md:grid">
        <div className="md:col-span-1">
          <NotesSider 
          notes = {notes}
           ondeleteNote={deleteNote} 
           onSelectNote={selectNote} 
           createNewNote={createNewNote}
           activeNoteId={activeNote?.id}/>
        </div>
        <div className=" md:col-span-2">{renderNoteContent()}</div>
      </main>


    </div>
  );
}
