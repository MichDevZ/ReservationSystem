using Microsoft.EntityFrameworkCore;
using Server.Models;

namespace ReadData
{
    public class AppReservasContext : DbContext
    {
        // Constructor que acepta DbContextOptions
        public AppReservasContext(DbContextOptions<AppReservasContext> options)
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Reserves>().HasOne(x => x.Cabain)
                                            .WithMany(c => c.Reservations)
                                            .HasForeignKey(r => r.CabainId);
        }

        public DbSet<Cabain> Cabain { get; set; }
        public DbSet<Reserves> Reserves { get; set; }
    }
}