import { Spinner } from '@radix-ui/themes'
import React from 'react'

export const LoadingSpinner = ({ loading }: {loading: boolean}) => {
  return (
    <div className='p-20'>
        <section className='flex justify-center'>
            <Spinner loading={loading} size='3'/>
        </section>
        <h4 className='font-medium text-gray-600
        flex justify-center pt-4'>データを読み込んでいます...</h4>
        
    </div>
  )
}
