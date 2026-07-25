namespace DotnetApi.Models;

public class Category
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string? Color { get; set; }

    public int UserId { get; set; }
    public User User { get; set; } = null!;

    public ICollection<Expense> Expenses { get; set; } = new List<Expense>();
}