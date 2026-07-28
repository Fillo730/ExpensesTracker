using DotnetApi.Dtos;

namespace DotnetApi.IServices;

public interface IAuthService
{
    Task<LoginResponseDto?> LoginUserAsync(LoginRequestDto loginRequestDto);

    Task<LoginResponseDto?> RegisterUserAsync(RegisterRequestDto registerRequestDto); 
}