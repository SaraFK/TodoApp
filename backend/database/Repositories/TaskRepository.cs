using Microsoft.EntityFrameworkCore;
using Todo.Core.Entities;
using Todo.Core.Interfaces;
using Todo.Database.Data;

namespace Todo.Database.Repositories;

public class TaskRepository : ITaskRepository
{
    private readonly AppDbContext _db;

    public TaskRepository(AppDbContext db)
    {
        _db = db;
    }

    public async Task<IEnumerable<TaskItem>> GetAllAsync() =>
        await _db.Tasks.OrderByDescending(t => t.CreatedAt).ToListAsync();

    public async Task<TaskItem?> GetByIdAsync(int id) =>
        await _db.Tasks.FindAsync(id);

    public async Task<TaskItem> AddAsync(TaskItem task)
    {
        _db.Tasks.Add(task);
        await _db.SaveChangesAsync();
        return task;
    }

    public async Task UpdateAsync(TaskItem task)
    {
        task.UpdatedAt = DateTime.UtcNow;
        _db.Tasks.Update(task);
        await _db.SaveChangesAsync();
    }

    public async Task DeleteAsync(TaskItem task)
    {
        _db.Tasks.Remove(task);
        await _db.SaveChangesAsync();
    }
}
