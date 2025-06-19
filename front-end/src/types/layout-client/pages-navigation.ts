export interface Page {
  title: string
  link: string
}
export type PagesNavigationProps = {
    title: string
    pages: Page[];
    currentPage?: string
}

