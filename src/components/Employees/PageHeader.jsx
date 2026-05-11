import React from 'react'
import { Button } from '@/components/ui/button';
const PageHeader = () => {
    return (
        <div className='flex justify-between  w-full px-4 py-4'>
            <div>
                <h2 className='text-2xl md:text-[28px] font-semibold tracking-tight'>Employees</h2>
                <p className='mt-1 text-sm text-muted-foreground'>Manage your workforce, roles and compensation.</p>
            </div>
            <div>
                <Button variant="brand" size="pill">
                    Add Employees
                </Button>
            </div>
        </div>
    )
}

export default PageHeader