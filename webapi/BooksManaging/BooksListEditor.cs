using webapi.SQL.Models;
using webapi.SQL;

namespace webapi.BooksManaging
{
    public class BooksListEditor
    {
        private readonly IRepository _repository;
        public BooksListEditor(IRepository repository)
        {
            _repository = repository;
        }
        public List<Book> GetAllBooks() => _repository.GetBooks();
        public List<Book> GetUsersBooks(string userName)
        {
            var user = _repository.GetUser(userName);
            var userBooksId = _repository.GetUserBooks(user.Id);
            List<Book> userBooks = new();
            foreach (var bookId in userBooksId)
            {
                userBooks.Add(_repository.GetBookById(bookId.BooksId));
            }
            return userBooks;
        }
        public void AddNewBook(string userName, int bookId)
        {
            var user = _repository.GetUser(userName);
            _repository.InsertNewBook(new() { BooksId = bookId, UsersId = user.Id });
        }
        public void DeleteBook(string userName, int bookId)
        {
            var user = _repository.GetUser(userName);
            _repository.RemoveUserBook(user.Id, bookId);
        }
    }
}
