import { useCallback, useEffect, useState } from 'react';
import { getMovies } from '../services/fakeMovieService.js'
import Pagination from './common/Pagination.jsx'
import Like from './common/Like.jsx'
import { paginate } from '../utils/paginate.js';
import ListGroup from './common/ListGroup.jsx';
import { getGenres } from '../services/fakeGenreService.js';
import _ from 'lodash';


const Movies = () => {
   //Page
   const pageSize = 2
   const [currentPage, setCurrentPage] = useState(1)
   //Movies
   const [movies, setMovies] = useState([])
   const [filterMovies, setFilterMovies] = useState(undefined)
   const itemsCount = !filterMovies ? movies.length : filterMovies.length

   //Paginated Movies
   const [paginatedMovies, setPaginatedMovies] = useState(() => {
      const moviesAPI = getMovies()
      return paginate(moviesAPI, 1, pageSize)
   })
   //Genres
   const [genres, setGenres] = useState([])
   const [selectedGenre, setSelectedGenre] = useState(undefined)


   const updatePaginatedMovies = useCallback((m, p) => {
      const paginatedMovies = paginate(m, p, pageSize)
      setPaginatedMovies(paginatedMovies)
   }, [])

   const handleDeleteMovie = (movie) => {
      if (!selectedGenre) {
         const newMovies = movies.filter(m => m._id !== movie._id)
         setMovies(newMovies)
         updatePaginatedMovies(newMovies, currentPage)
         // const paginatedMovies = paginate(movies, currentPage, pageSize)
         // setPaginatedMovies(paginatedMovies)
      } else {
         const newMovies = filterMovies.filter(m => m._id !== movie._id)
         setFilterMovies(newMovies)
         updatePaginatedMovies(newMovies, currentPage)
         // const paginatedMovies = paginate(movies, currentPage, pageSize)
         // setPaginatedMovies(paginatedMovies)
      }
   }

   const handleLikeStatus = (movie) => {
      if (!selectedGenre) {
         const newMovies = [...movies]
         const index = movies.indexOf(movie)
         newMovies[index] = { ...movies[index] }
         newMovies[index].liked = !movies[index].liked
         setMovies(newMovies)
         // const paginatedMovies = paginate(newMovies, currentPage, pageSize)
         // setPaginatedMovies(paginatedMovies)
         updatePaginatedMovies(newMovies, currentPage)
      } else {
         const newMovies = [...filterMovies]
         const index = filterMovies.indexOf(movie)
         newMovies[index] = { ...filterMovies[index] }
         newMovies[index].liked = !filterMovies[index].liked
         setFilterMovies(newMovies)
         // const paginatedMovies = paginate(newMovies, currentPage, pageSize)
         // setPaginatedMovies(paginatedMovies)
         updatePaginatedMovies(newMovies, currentPage)
      }
   }

   const handlePageChange = (page) => {
      if (!selectedGenre) {
         const paginatedMovies = paginate(movies, page, pageSize)
         setPaginatedMovies(paginatedMovies)
         setCurrentPage(page)
      } else {
         const paginatedMovies = paginate(filterMovies, page, pageSize)
         setPaginatedMovies(paginatedMovies)
         setCurrentPage(page)
      }
   }

   const handleGenreSelected = (genre) => {
      setSelectedGenre(genre)
      const filteredMovies = (genre && genre._id !== "all")
         ? movies.filter(m => m.genre._id === genre._id)
         : movies
      setFilterMovies(filteredMovies)
      updatePaginatedMovies(filteredMovies, 1) //setCurrentPage to 1
      setCurrentPage(1)
   }

   const [sortColumn, setSortColumn] = useState({})
   console.log(sortColumn);
   const handleSort = (path) => {
      const cloneSortColumn = { ...sortColumn }
      if (cloneSortColumn.path === path) {
         cloneSortColumn.order = sortColumn.order === "asc" ? "desc" : "asc"
      } else {
         cloneSortColumn.path = path
         cloneSortColumn.order = "asc"
      }
      setSortColumn(cloneSortColumn)
      const sorted = _.orderBy(paginatedMovies, [cloneSortColumn.path], [cloneSortColumn.order])
      setPaginatedMovies(sorted)
   }

   useEffect(() => {
      const genres = [{ name: "All genres", _id: "all" }, ...getGenres()]
      setMovies(getMovies())
      setGenres(genres)
   }, [])

   const renderSortIcon = (path) => {
      if (sortColumn.path === path) {
         if (sortColumn.order === "asc")
            return <span><i className="fa fa-sort-asc"></i></span>
         if (sortColumn.order === "desc")
            return <span><i className="fa fa-sort-desc"></i></span>
      }
      if (!sortColumn.order)
         return null
   }

   return (
      <>
         {movies.length === 0 ?
            <p>There are no movies in DB</p>
            :
            (
               <div className="row">
                  <div className="col-3">
                     <ListGroup
                        items={genres}
                        onItemSelect={handleGenreSelected}
                        selectedItem={selectedGenre}
                     // textProperty="name"
                     // valueProperty="_id"
                     />
                  </div>
                  <div className="col">
                     {
                        (selectedGenre && selectedGenre._id !== "all")
                           ? <p>There are {filterMovies.length} {selectedGenre.name} movies in DB</p>
                           : <p>There are {itemsCount} movies in DB</p>}
                     {/* Movie Table */}
                     <table className="table">
                        <thead>
                           <tr style={{ display: 'flex', width: '0vw' }}>
                              <th onClick={() => handleSort("title")}>
                                 Title
                                 {renderSortIcon("title")}
                              </th>
                              <th onClick={() => handleSort("genre.name")}>
                                 <span>Genre</span>
                                 {renderSortIcon("genre.name")}
                              </th>
                              <th onClick={() => handleSort("numberInStock")}>Stock{renderSortIcon("numberInStock")}</th>
                              <th onClick={() => handleSort("dailyRentalRate")}>Rate{renderSortIcon("dailyRentalRate")}</th>
                           </tr>
                        </thead>
                        <tbody>
                           {paginatedMovies.map((movie, movieidx) => {
                              return (
                                 <tr key={movieidx}>
                                    <td>{movie.title}</td>
                                    <td>{movie.genre.name}</td>
                                    <td>{movie.numberInStock}</td>
                                    <td>{movie.dailyRentalRate}</td>
                                    <td>
                                       <Like
                                          liked={movie.liked}
                                          onToggleLike={() => handleLikeStatus(movie)} />
                                    </td>
                                    <td>
                                       <button className="btn btn-danger btn-sm"
                                          onClick={() => handleDeleteMovie(movie)}
                                       >Delete</button>
                                    </td>
                                 </tr>
                              )
                           })}
                        </tbody>
                     </table>
                     <Pagination
                        itemsCount={
                           (selectedGenre && selectedGenre._id !== 'all')
                              ? filterMovies.length
                              : itemsCount}
                        pageSize={pageSize}
                        onPageChange={handlePageChange}
                        currentPage={currentPage}
                     />
                  </div>

               </div>
            )
         }
      </>
   );
}

export default Movies;