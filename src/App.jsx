/* eslint-disable no-unused-vars */
import { Book as BookIcon } from "lucide-react";
import Header from "./Header";
import Footer from "./Footer";
import Book from "./Book";
import './index.css';

function App() {
  return (
    <div>
      <Header />
      <div className="book-container">
        <Book />
      </div>
      <Footer />
    </div>
  );
}

export default App;
