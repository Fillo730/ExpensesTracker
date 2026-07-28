using DotnetApi.Models;

namespace DotnetApi.Repositories;

public class BaseRepository(ApplicationDbContext dbContext)
{
    protected readonly ApplicationDbContext _dbContext = dbContext;

    public async Task SaveChangesAsync()
    {
        await _dbContext.SaveChangesAsync();
    }
}