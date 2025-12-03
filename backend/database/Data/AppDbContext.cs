using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using Todo.Core.Entities;

namespace Todo.Database.Data;

public class AppDbContext : DbContext
{
    public DbSet<TaskItem> Tasks => Set<TaskItem>();

    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
}