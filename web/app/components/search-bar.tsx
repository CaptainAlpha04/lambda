import { Search } from "lucide-react"

const SearchBar = () => {
  return (
    <div className="bg-white shadow-sm p-4">
      <div className="max-w-3xl mx-auto relative">
        <input
          type="text"
          placeholder="Search or type a command"
          className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
      </div>
    </div>
  )
}

export default SearchBar

