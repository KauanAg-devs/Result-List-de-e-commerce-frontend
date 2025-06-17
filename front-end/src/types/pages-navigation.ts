import { React } from 'react'

export type PagesNavigationProps = {
    title: string
    pages: string[];
    setPages: React.Dispatch<React.SetStateAction<string>>
}