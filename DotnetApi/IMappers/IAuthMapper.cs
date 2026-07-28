using DotnetApi.Dtos;
using DotnetApi.Models;

namespace DotnetApi.IMappers;

public interface IAuthMapper
{
    LoginResponseDto MapUserToLoginResponseDto(User user, string token, DateTime expirateDate);

    User MapRegisterRequestDtoToUser(RegisterRequestDto registerRequestDto);
}