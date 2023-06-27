using Microsoft.EntityFrameworkCore;
using webapi.SQL.Models;

namespace webapi.SQL
{
    public class SqlRepository : IRepository
    {
        private readonly DbContextOptions<BookClubContext> _options;
        public SqlRepository(string connectionString)
        {
            var optionBuilder = new DbContextOptionsBuilder<BookClubContext>();
            _options = optionBuilder.UseSqlServer(connectionString).Options;
        }
        public User GetUser(string userName)
        {
            using BookClubContext db = new(_options);
            return db.Users.Where(u => u.UserName == userName).AsNoTracking().FirstOrDefault();
        }
        public void InsertNewUser(User user)
        {
            using BookClubContext db = new(_options);
            db.Users.Add(user);
            db.SaveChanges();
        }
        public List<Book> GetBooks()
        {
            using BookClubContext db = new(_options);
            return db.Books.AsNoTracking().ToList();
        }
        public List<UserBook> GetUserBooks(int userId)
        {
            using BookClubContext db = new(_options);
            return db.UserBooks.Where(u => u.UsersId == userId).AsNoTracking().ToList();
        }
        public void InsertNewBook(UserBook userBook)
        {
            using BookClubContext db = new(_options);
            db.UserBooks.Add(userBook);
            db.SaveChanges();
        }
        public void RemoveUserBook(int userId, int bookId)
        {
            using BookClubContext db = new(_options);
            var bookToDelete = db.UserBooks.Where(b => b.BooksId == bookId && b.UsersId == userId).First();
            db.UserBooks.Remove(bookToDelete);
            db.SaveChanges();
        }
        public Book GetBookById(int id)
        {
            using BookClubContext db = new(_options);
            return db.Books.Where(b => b.Id == id).AsNoTracking().FirstOrDefault();
        }
    }
}
