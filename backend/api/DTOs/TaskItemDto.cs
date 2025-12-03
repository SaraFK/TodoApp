namespace Todo.Api.DTOs;

public class TaskItemDto
{
    public required string Title { get; set; }
    public string? Description { get; set; }
    public bool IsCompleted { get; set; }
}