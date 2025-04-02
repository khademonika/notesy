import React from 'react'
import { Button } from './ui/button'
import { Plus } from 'lucide-react'

interface HeaderProps{
    OnNewNote:()=>void
}
function Header({OnNewNote}:HeaderProps) {
  return (
    <div className='border-b p-4 bg-card'>
        <div className='container mx-auto flex justify-between items-center'>
            <h1 className='text-2xl font-bold'>Browser Notes</h1>
<Button size="sm"onClick={OnNewNote}>
  <Plus className='h-4 w-4 mr-2'/>  New Notes</Button>
        </div>

    </div>
  )
}

export default Header
