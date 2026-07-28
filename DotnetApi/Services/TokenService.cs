using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using DotnetApi.IServices;
using DotnetApi.Models;
using DotnetApi.Utils;
using Microsoft.IdentityModel.Tokens;

namespace DotnetApi.Services;

public class TokenService (IConfiguration config) : ITokenService
{
    private readonly IConfiguration _config = config;

    public (string Token, DateTime Expiration) GenerateToken(User user)
    {
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Key"]!));

        var expirationDate = DateTime.UtcNow.AddHours(AppConstants.TOKEN_HOURS_DURATION);

        var claims = new List<Claim>
        {
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new Claim(ClaimTypes.Name, user.Username),
            new Claim(ClaimTypes.Role, user.Role.ToString()),
        };

        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(claims),
            Expires = expirationDate,
            SigningCredentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256Signature),
            Issuer = _config["Issuer"],
            Audience = _config["Audience"]
        };

        var tokenHandler = new JwtSecurityTokenHandler();
        var token = tokenHandler.CreateToken(tokenDescriptor);

        return (tokenHandler.WriteToken(token),expirationDate) ;
    }
}