import React from 'react'
import { Button } from 'skyroc-ui/button'

function ButtonPage() {
    return (
        <div className='flex  gap-4'>
            <Button>Default</Button>
            <Button variant='outline'>Outline</Button>
            <Button variant='secondary'>Secondary</Button>
            <Button variant='ghost'>Ghost</Button>
            <Button variant='link'>Link</Button>
            <Button variant='destructive'>Destructive</Button>
            <Button variant='default' size='sm'>Small</Button>
        </div>
    )
}

export default ButtonPage