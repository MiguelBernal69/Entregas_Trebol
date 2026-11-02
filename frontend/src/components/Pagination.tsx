interface PaginationProps {
  currentPage: number
  totalItems: number
  pageSize: number
  onPageChange: (page: number) => void
}

export default function Pagination({
  currentPage,
  totalItems,
  pageSize = 30,
  onPageChange,
}: PaginationProps) {
  const totalPages = Math.ceil(totalItems / pageSize)

  if (totalPages <= 1) return null

  const startItem = (currentPage - 1) * pageSize + 1
  const endItem = Math.min(currentPage * pageSize, totalItems)

  // Generar rango de páginas visibles con elipses
  const getPageNumbers = () => {
    const pages: (number | string)[] = []
    const maxVisible = 5

    if (totalPages <= maxVisible + 2) {
      for (let i = 1; i <= totalPages; i++) pages.push(i)
    } else {
      pages.push(1)
      if (currentPage > 3) pages.push('...')

      const start = Math.max(2, currentPage - 1)
      const end = Math.min(totalPages - 1, currentPage + 1)

      for (let i = start; i <= end; i++) {
        pages.push(i)
      }

      if (currentPage < totalPages - 2) pages.push('...')
      pages.push(totalPages)
    }

    return pages
  }

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-4 bg-white border-t border-gray-100">
      <div className="text-xs sm:text-sm text-gray-500">
        Mostrando <span className="font-semibold text-gray-800">{startItem}</span> a{' '}
        <span className="font-semibold text-gray-800">{endItem}</span> de{' '}
        <span className="font-semibold text-gray-800">{totalItems}</span> clientes
      </div>

      <div className="flex items-center gap-1.5">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1.5 rounded-lg border border-gray-200 text-xs sm:text-sm font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
        >
          ← Anterior
        </button>

        <div className="flex items-center gap-1">
          {getPageNumbers().map((p, idx) => {
            if (p === '...') {
              return (
                <span key={`dots-${idx}`} className="px-2 text-gray-400 text-xs">
                  ...
                </span>
              )
            }
            const pageNum = Number(p)
            const isActive = pageNum === currentPage
            return (
              <button
                key={pageNum}
                onClick={() => onPageChange(pageNum)}
                className={`min-w-[32px] h-8 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white font-bold shadow-sm'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {pageNum}
              </button>
            )
          })}
        </div>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1.5 rounded-lg border border-gray-200 text-xs sm:text-sm font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
        >
          Siguiente →
        </button>
      </div>
    </div>
  )
}
