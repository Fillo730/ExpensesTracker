using DotnetApi.Utils;

namespace DotnetApi.Dtos;

public class LoginResponseDto
{
    public string Token { get; set; } = string.Empty;

    public string Username { get; set; } = string.Empty;

    public string Email {  get; set; } = string.Empty;

    public UserRoleEnum UserRole { get; set; }

    public DateTime ExpiresDate { get; set; }

    public int Id { get; set; }
}