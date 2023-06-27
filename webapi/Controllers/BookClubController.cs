using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using webapi.Authentication;
using webapi.BooksManaging;
using webapi.SQL.Models;
using webapi.SQL;

namespace webapi.Controllers
{
    [ApiController]
    public class BookClubController : ControllerBase
    {
        private Authenticator _authenticator;
        private BooksListEditor _booksListEditor;
        public BookClubController(IRepository repository)
        {
            _authenticator = new(repository);
            _booksListEditor = new(repository);
        }
        [HttpPost]
        [Route("api/login")]
        public ActionResult Login(string login, string password)
        {
            try
            {
                return Ok(_authenticator.Authenticate(login, password));
            }
            catch (NullReferenceException)
            {
                return Unauthorized();
            }
        }
        [HttpGet]
        [Route("api/")]
        public ActionResult GetBookList() => Ok(_booksListEditor.GetAllBooks());

        [HttpGet]
        [Authorize]
        [Route("api/userbooks")]
        public ActionResult GetUserBooks() => Ok(_booksListEditor.GetUsersBooks(User.Identity.Name));

        [HttpPost]
        [Authorize]
        [Route("api/addBook")]
        public ActionResult AddBook(int bookId)
        {
            _booksListEditor.AddNewBook(User.Identity.Name, bookId);
            return Ok();
        }
        [HttpDelete]
        [Authorize]
        [Route("api/deleteBook")]
        public ActionResult DeleteBook(int bookId)
        {
            _booksListEditor.DeleteBook(User.Identity.Name, bookId);
            return Ok();
        }
    }
}
