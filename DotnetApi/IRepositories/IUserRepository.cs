using DotnetApi.Models;
using DotnetApi.Repositories;

namespace DotnetApi.IRepositories;

public interface IUserRepository
{
    Task<User?> GetUserByEmailAsync(string email);

    Task<User?> GetUserByIdAsync(int id);

    Task<User?> GetUserByUsernameAsync(string username);

    Task<User?> CreateUserAsync(User user);

    Task SaveChangesAsync();
}