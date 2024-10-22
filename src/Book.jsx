import { useState } from 'react';
import { Heart, Info, Search } from 'lucide-react';
import './index.css';

const Book = () => {
  const [likedBooks, setLikedBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('id');
  const [sortOrder, setSortOrder] = useState('asc');
  const [selectedBook, setSelectedBook] = useState(null); // State untuk menyimpan buku yang dipilih

  const toggleLike = (id) => {
    if (likedBooks.includes(id)) {
      setLikedBooks(likedBooks.filter((bookId) => bookId !== id));
    } else {
      setLikedBooks([...likedBooks, id]);
    }
  };

  const books = [
    {
      id: '1',
      foto: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1602190253l/52578297.jpg',
      judul: 'The Midnight Library',
      penulis: 'Matt Haig',
      penerbit: 'Canongate Books',
      tahun_terbit: '2020',
      genre: 'Fiksi, Fantasi',
      sinopsis: 'Buku ini bercerita tentang Nora Seed yang mendapati dirinya di sebuah perpustakaan aneh antara hidup dan mati...',
    },
    {
      id: '2',
      foto: 'https://m.media-amazon.com/images/M/MV5BZGM5ODU5YTktMGUxYi00YjQyLTk0MzgtZTg0MWQ2NDg0YTA0XkEyXkFqcGc@._V1_.jpg',
      judul: 'Where the Crawdads Sing',
      penulis: 'Delia Owens',
      penerbit: 'G.P. Putnam s Sons',
      tahun_terbit: '2018',
      genre: 'Misteri, Drama, Romansa',
      sinopsis: 'Kya Clark, seorang gadis yang tumbuh sendiri di rawa-rawa North Carolina...',
    },
    {
      id: '3',
      foto: 'https://cdn.gramedia.com/uploads/items/9786020633176_.Atomic_Habit.jpg',
      judul: 'Atomic Habits',
      penulis: 'James Clear',
      penerbit: 'Penguin Random House',
      tahun_terbit: '2018',
      genre: 'Pengembangan Diri, Psikologi',
      sinopsis: 'Atomic Habits memberikan panduan praktis tentang cara mengubah kebiasaan buruk...',
    },
    {
      id: '4',
      foto: 'https://cdn.gramedia.com/uploads/products/65decde8c5.jpg',
      judul: 'Educated',
      penulis: 'Tara Westover',
      penerbit: 'Random House',
      tahun_terbit: '2018',
      genre: 'Memoar, Biografi',
      sinopsis: 'Memoar Tara Westover ini menceritakan kehidupannya sebagai anak dari keluarga...',
    },
    {
      id: '5',
      foto: 'https://cdn.gramedia.com/uploads/items/ID_HCO2014MTH04TAAE_B.jpg',
      judul: 'The Alchemist',
      penulis: 'Paulo Coelho',
      penerbit: 'HarperCollins',
      tahun_terbit: '1988',
      genre: 'Fiksi, Petualangan, Filsafat',
      sinopsis: 'Santiago, seorang gembala muda dari Spanyol, memulai perjalanan untuk menemukan...',
    },
  ];

  const sortBooks = (books) => {
    return books.sort((a, b) => {
      if (sortBy === 'id' || sortBy === 'tahun_terbit') {
        return sortOrder === 'asc' ? a[sortBy] - b[sortBy] : b[sortBy] - a[sortBy];
      } else if (sortBy === 'judul') {
        return sortOrder === 'asc'
          ? a.judul.localeCompare(b.judul)
          : b.judul.localeCompare(a.judul);
      }
      return 0;
    });
  };

  const filteredBooks = sortBooks(
    books.filter((book) =>
      book.judul.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const closeModal = () => {
    setSelectedBook(null);
  };

  return (
    <div className="book-container">
      <div className="search-bar">
        <Search />
        <input
          type="text"
          placeholder="Cari buku..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="sort-bar">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="id"> By ID</option>
          <option value="judul"> By Name</option>
          <option value="tahun_terbit"> By Year</option>
        </select>

        <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>

      <div className="book-list"> {/* Add this wrapper */}
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <div key={book.id} className="book">
              {book.foto && (
                <img src={book.foto} alt={book.judul} className="book-image" />
              )}
              <Heart
                color="black"
                fill={likedBooks.includes(book.id) ? 'red' : 'none'}
                onClick={() => toggleLike(book.id)}
                className="heart-icon"
              />
              <h2>{book.judul}</h2>
              <p><strong>Penulis:</strong> {book.penulis}</p>
              <p><strong>Penerbit:</strong> {book.penerbit}</p>
              <p><strong>Tahun Terbit:</strong> {book.tahun_terbit}</p>
              <p><strong>Genre:</strong> {book.genre}</p>
              <p><strong>Sinopsis:</strong> {book.sinopsis}</p>
              <div className="info-icon" onClick={() => setSelectedBook(book)}>
                <Info color="#3498db" /> {/* Mengubah warna ikon jika perlu */}
                <span>Informasi</span> {/* Menambahkan teks "Informasi" */}
              </div>
            </div>
          ))
        ) : (
          <p>Buku tidak ditemukan</p>
        )}
      </div>

      {/* Modal untuk menampilkan detail buku */}
      {selectedBook && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <img src={selectedBook.foto} alt={selectedBook.judul} className="book-image" />
            <h2>{selectedBook.judul}</h2>
            <p><strong>Penulis:</strong> {selectedBook.penulis}</p>
            <p><strong>Penerbit:</strong> {selectedBook.penerbit}</p>
            <p><strong>Tahun Terbit:</strong> {selectedBook.tahun_terbit}</p>
            <p><strong>Genre:</strong> {selectedBook.genre}</p>
            <p><strong>Sinopsis:</strong> {selectedBook.sinopsis}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Book;
