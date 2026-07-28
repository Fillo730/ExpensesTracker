using DotnetApi.IRepositories;
using DotnetApi.Models;
using Microsoft.EntityFrameworkCore;

namespace DotnetApi.Repositories;

public class UserRepository(ApplicationDbContext dbContext) : BaseRepository(dbContext), IUserRepository
{
    public async Task<User?> CreateUserAsync(User user)
    {
        await _dbContext.Users.AddAsync(user);

        return user;
    }

    public async Task<User?> GetUserByEmailAsync(string email)
    {
        return await _dbContext.Users.Where(u => u.Email == email)
            .FirstOrDefaultAsync();
    }

    public async Task<User?> GetUserByIdAsync(int id)
    {
        return await _dbContext.Users.Where(u => u.Id == id)
            .FirstOrDefaultAsync();
    }

    public async Task<User?> GetUserByUsernameAsync(string username)
    {
        return await _dbContext.Users.Where(u => u.Username == username)
            .FirstOrDefaultAsync();
    }
}

