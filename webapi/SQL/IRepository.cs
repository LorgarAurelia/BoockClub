using webapi.SQL.Models;

namespace webapi.SQL
{
    public interface IRepository
    {
        List<Book> GetBooks();
        User GetUser(string userName);
        List<UserBook> GetUserBooks(int userId);
        void InsertNewUser(User user);
        void InsertNewBook(UserBook userBook);
        Book GetBookById(int id);
        void RemoveUserBook(int userId, int bookId);
    }
}
