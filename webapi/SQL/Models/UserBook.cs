namespace webapi.SQL.Models
{
    public partial class UserBook
    {
        public int Id { get; set; }
        public int BooksId { get; set; }
        public int UsersId { get; set; }
    }
}
