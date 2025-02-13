import { ChevronLeft, ChevronRight } from 'lucide-react'
import { PaginationType } from '../types'

const Pagination = ({data,page,setPage}:PaginationType) => {
  return (
    <div className="w-full flex items-center justify-center gap-xlarge ">
    <button disabled={!data?.prev} className="cursor-pointer disabled:text-gray-500 disabled:cursor-not-allowed" onClick={()=>setPage((prev)=>prev-1)}>
      <ChevronLeft />
    </button>
    <p>{page}</p>
    <button disabled={!data?.next} className="cursor-pointer disabled:text-gray-500 disabled:cursor-not-allowed" onClick={()=>setPage((prev)=>prev+1)}>
      <ChevronRight />
    </button>
  </div>
  )
}

export default Pagination