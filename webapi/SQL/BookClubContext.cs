using Microsoft.EntityFrameworkCore;
using webapi.SQL.Models;

namespace webapi.SQL
{
    public partial class BookClubContext : DbContext
    {
        public BookClubContext(DbContextOptions<BookClubContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Book> Books { get; set; } = null!;
        public virtual DbSet<User> Users { get; set; } = null!;
        public virtual DbSet<UserBook> UserBooks { get; set; } = null!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Book>(entity =>
            {

                entity.Property(e => e.Id).ValueGeneratedOnAdd();

                entity.Property(e => e.Name).HasMaxLength(50);
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedOnAdd();

                entity.Property(e => e.Password).HasMaxLength(15);

                entity.Property(e => e.UserName)
                    .HasMaxLength(50)
                    .HasColumnName("User");
            });

            modelBuilder.Entity<UserBook>(entity =>
            {

                entity.Property(e => e.Id).ValueGeneratedOnAdd();
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
