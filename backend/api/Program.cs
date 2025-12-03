using Microsoft.EntityFrameworkCore;
using Todo.Core.Interfaces;
using Todo.Database.Data;
using Todo.Database.Repositories;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddOpenApi();

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite("Data Source=tasks.db"));

builder.Services.AddScoped<ITaskRepository, TaskRepository>();

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    db.Database.EnsureCreated();   // This creates tasks.db and the Tasks table
}

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();
app.UseHsts();
app.UseCors(p => p.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin());
app.MapControllers();

app.Run();
