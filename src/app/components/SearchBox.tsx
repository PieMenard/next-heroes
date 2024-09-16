import { FormEvent } from 'react';

type SearchProps = {
  query: string;
  setQuery: (query: string) => void;
  handleSearch: (query: string) => void;
};

const SearchBox = ({ query, setQuery, handleSearch }: SearchProps) => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSearch(query);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          className="border-2 px-2 rounded-sm bg-slate-100 mr-2"
          placeholder="Search a hero..."
          value={query}
          type="text"
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          type="submit"
          className="rounded-md px-2 bg-slate-500 text-white"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBox;
