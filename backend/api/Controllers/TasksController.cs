using Microsoft.AspNetCore.Mvc;
using Todo.Core.Entities;
using Todo.Core.Interfaces;
using Todo.Api.DTOs;

namespace Todo.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TasksController : ControllerBase
{
    private readonly ITaskRepository _repo;

    public TasksController(ITaskRepository repo)
    {
        _repo = repo;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll() =>
        Ok(await _repo.GetAllAsync());

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var task = await _repo.GetByIdAsync(id);
        return task == null ? NotFound() : Ok(task);
    }

    [HttpPost]
    public async Task<IActionResult> Create(TaskItemDto dto)
    {
        var task = new TaskItem
        {
            Title = dto.Title,
            Description = dto.Description,
            IsCompleted = dto.IsCompleted
        };

        await _repo.AddAsync(task);
        return CreatedAtAction(nameof(GetById), new { id = task.Id }, task);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, TaskItemDto dto)
    {
        var task = await _repo.GetByIdAsync(id);
        if (task == null) return NotFound();

        task.Title = dto.Title;
        task.Description = dto.Description;
        task.IsCompleted = dto.IsCompleted;

        await _repo.UpdateAsync(task);
        return Ok(task);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var task = await _repo.GetByIdAsync(id);
        if (task == null) return NotFound();

        await _repo.DeleteAsync(task);
        return NoContent();
    }
}
