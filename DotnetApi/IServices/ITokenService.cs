using DotnetApi.Models;

namespace DotnetApi.IServices;

public interface ITokenService
{
    (string Token, DateTime Expiration) GenerateToken(User user);
}