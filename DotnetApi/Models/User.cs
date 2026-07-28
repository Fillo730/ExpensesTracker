using DotnetApi.Utils;

namespace DotnetApi.Models;

public class User
{
    public int Id { get; set; }

    public string Email { get; set; } = string.Empty;

    public string PasswordHash { get; set; } = string.Empty;

    public string Username { get; set;} = string.Empty;

    public UserRoleEnum Role { get; set; } = UserRoleEnum.User;

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public ICollection<Category> Categories { get; set;} = new List<Category>();

    public ICollection<Expense> Expenses { get; set;} = new List<Expense>();
}