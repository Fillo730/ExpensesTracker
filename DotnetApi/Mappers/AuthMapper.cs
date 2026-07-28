using DotnetApi.Dtos;
using DotnetApi.IMappers;
using DotnetApi.Models;
using DotnetApi.Utils;

namespace DotnetApi.Mappers;

public class AuthMapper : IAuthMapper
{
    public User MapRegisterRequestDtoToUser(RegisterRequestDto registerRequestDto)
    {
        return new User
        {
            Username = registerRequestDto.Username,
            Email = registerRequestDto.Email,
            Role = UserRoleEnum.User,
        };
    }

    public LoginResponseDto MapUserToLoginResponseDto(User user, string token, DateTime expirateDate)
    {
        return new LoginResponseDto
        {
            Id = user.Id,
            Token = token,
            Username = user.Username,
            Email = user.Email,
            UserRole = user.Role,
            ExpiresDate = expirateDate,
        };
    }
}